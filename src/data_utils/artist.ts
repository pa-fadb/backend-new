/** @module ArtistDataUtils Contains data utilities for artists. */



import { Artist, Availability, Prisma } from "@prisma/client"
import { Database } from "../../prisma"



export type ArtistCreateTemplate = {
    name: string,
    metadata?: {
        artistAliases?: string[],
        description?: string,
        notes?: string,
        genre?: string,
        albums?: {
            name: string,
            tracks: {
                title: string,
                romanizedTitle?: string,
                contributors: string[],
                availability: Availability
            }[]
        }[],
        socials?: string[]
    },
    availability: Availability,
    rights?: {
        identifier: string,
        isAllowed: boolean
    }[];
}



let includeAll: Prisma.ArtistInclude = {
    musicLabel: true,
    metadata: true,
    rights: true,
}
/**
 * Creates an artist for the database.
 * 
 * @param data The data required for the artist creation.
 * @returns The created artist.
 */
export async function artistCreate(createTemplate: ArtistCreateTemplate) {
    let data: Prisma.ArtistCreateInput = {
        name: createTemplate.name,
        availability: createTemplate.availability,
        metadata: createTemplate.metadata !== undefined ? {
            create: {
                artistAliases: createTemplate.metadata.artistAliases,
                description: createTemplate.metadata.description,
                notes: createTemplate.metadata.notes,
                genre: createTemplate.metadata.genre,
                albums: createTemplate.metadata.albums !== undefined ? {
                    create: createTemplate.metadata.albums.map((albumTemplate) => {
                        return {
                            name: albumTemplate.name,
                            tracks: albumTemplate.tracks !== undefined ? {
                                create: albumTemplate.tracks
                            } : undefined
                        }
                    })
                } : undefined,
                socials: createTemplate.metadata.socials
            }
        } : undefined,
        rights: createTemplate.rights !== undefined ? {
            create: createTemplate.rights
        } : undefined,
        addedAt: new Date(),
    }
    return await Database.artist.create({
        data: data,
        include: includeAll
    });
}



artistCreate({
    name: "test",
    metadata: {
        artistAliases?: string[]
        description
        notes
        genre
        albums
        socials
    }
})


/**
 * Gets the artist from the database based on their ID.
 * 
 * @param artistId The artist's ID.
 * @returns The artist with the ID.
 */
export async function artistGetFromId(artistId: number) {
    return await Database.artist.findFirst({
        where: {id: artistId},
        include: includeAll
    });
}


/**
 * Gets artists that have an exact name.
 * This is not a search, rather it returns the artist bearing the exact name as the input.
 * This also doesn't take into account artists' aliases.
 * 
 * For a proper search including aliases, see @see {@link artistSearchByNames}.
 * 
 * @param artistName Artist name to search for.
 * @returns The artists that have the same name as {@link artistName}.
 */
export async function artistGetFromName(artistName: string) {
    return await Database.artist.findMany({
        where: {name: artistName},
        include: includeAll
    });
}



/**
 * Searches and returns artists with the input's name or alias.
 * 
 * For exact name matching, see @see {@link artistGetFromName}.
 * 
 * @param artistNameOrAlias The artist's name or alias.
 * @returns The artists that has the names or aliases partially matching {@link artistNameOrAlias}.
 */
export async function artistSearchByNames(artistNameOrAlias: string) {
    let nameResult = await Database.artist.findMany({
        where: {name: {search: artistNameOrAlias}},
        include: includeAll
    });

    // TODO test for sql injection
    let aliasResult = await Database.$queryRaw<Artist[]>`
        SELECT artist
        FROM (
            SELECT artist, unnest(artistAliases) AS alias
            FROM artist_metadatas
        )
        WHERE alias LIKE '%${artistNameOrAlias}%' OR WHERE name LIKE '%${artistNameOrAlias}%';
    `;

    return [...nameResult, ...aliasResult]
}



/**
 * Searches the name, aliases, description, notes, genre, and socials from a search term.
 * 
 * @param searchTerm The search term.
 * @returns Artists that have information relating to the search term.
 */
export async function artistSearchFull(searchTerm: string) {
    let nameOrAliasResult = await artistSearchByNames(searchTerm);

    let miscResult = await Database.artist.findMany({
        where: {
            OR: [
                {metadata: {description: {search: searchTerm}}},
                {metadata: {notes: {search: searchTerm}}},
                {metadata: {genre: {search: searchTerm}}}
                // {metadata: {socials: {search: query}}}
            ]
        },
        include: includeAll
    });

    // TODO test for sql injection
    let socialsResult = await Database.$queryRaw<Artist[]>`
        SELECT artist
        FROM (
            SELECT artist, unnest(socials) AS social
            FROM artist_metadatas
        )
        WHERE social LIKE ${searchTerm}
    `;

    return [...nameOrAliasResult, ...miscResult];
}
