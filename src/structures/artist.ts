/** @module ArtistStructs Contains data structures for artists. */
import { Prisma, Artist, Availability } from "@prisma/client";
import { Database } from "../../prisma";
import { ArtistMetadataCreateTemplate, artistMetadataCTToInput } from "./artistMetadata";
import { RightCreateTemplate, rightCTToInput } from "./right";
import { isBlankArray, ensureNotBlankString } from "../util/templateValidation";

/** The create template for artists. */
export type ArtistCreateTemplate = {
    name: string,
    metadata?: ArtistMetadataCreateTemplate,
    availability: Availability,
    rights?: RightCreateTemplate[];
}

/**
 * Creates the input required for creating artists in Prisma.
 * 
 * @param artistCT The input create template.
 * @returns The input that can be used to create it.
 * Note that this doesn't include relations to the "upper level" (eg, no `artistId` included in the artist's metadata).
 */
export function artistCTToInput(artistCT: ArtistCreateTemplate): Prisma.ArtistCreateWithoutMusicLabelInput {
    return {
        name: artistCT.name,
        metadata:
            artistCT.metadata
            ? { create: artistMetadataCTToInput(artistCT.metadata) }
            : undefined,
        availability: artistCT.availability,
        rights:
            artistCT.rights !== undefined && !isBlankArray(artistCT.rights)
            ? { create: artistCT.rights.map((rightCT) => rightCTToInput(rightCT)) }
            : undefined,
        addedAt: new Date()
    };
}

/** The update template for artists. */
export type ArtistUpdateTemplate = {
    name?: string,
    metadata?: ArtistMetadataCreateTemplate,
    availability?: Availability,
    rights?: RightCreateTemplate[];
}

/**
 * Creates the input required for updating artists in Prisma.
 * 
 * @param artistUT The input update template.
 * @returns The input that can be used to update it.
 * Note that this doesn't include relations to the "upper level" (eg, no `artistId` included in the artist's metadata).
 */
export function artistUTToInput(artistUT: ArtistUpdateTemplate): Prisma.ArtistUpdateWithoutMusicLabelInput {
    return {
        name: ensureNotBlankString(artistUT.name),
        metadata:
            artistUT.metadata
            ? { create: artistMetadataCTToInput(artistUT.metadata) }
            : undefined,
        availability: artistUT.availability,
        rights:
            artistUT.rights !== undefined && !isBlankArray(artistUT.rights)
            ? { create: artistUT.rights.map((rightCT) => rightCTToInput(rightCT)) }
            : undefined
    };
}

/** When used in a query, includes all relation s that the artist has on return. */
export let artistQueryIncludeAll: Prisma.ArtistInclude = {
    metadata: true,
    musicLabel: true,
    rights: true
}

/** The artist structure. */
export class ArtistStruct {
    /**
     * Creates an artist in the database using a template.
     * 
     * @param artistCT The create template.
     * @returns The artist.
     */
    static async create(artistCT: ArtistCreateTemplate) {
        let query = artistCTToInput(artistCT);
        return await Database.artist.create({
            data: query,
            include: artistQueryIncludeAll,
        })
    }

    /**
     * Updates an artist in the database using a template.
     * 
     * @param artistUT The update template.
     * @returns The artist.
     */
    static async update(artistID: number, artistUT: ArtistUpdateTemplate) {
        let query = artistUTToInput(artistUT);
        return await Database.artist.update({
            where: { id: artistID },
            data: query,
            include: artistQueryIncludeAll,
        })
    }
}
