import { Artist } from "@prisma/client"
import { Database } from "../../prisma"



let includeAll = {
    metadata: true,
    rights: true,
}


export async function artistCreate(data: Artist) {
    return await Database.artist.create({
        data: data,
        include: includeAll
    });
}


export async function artistGetFromId(artistId: number) {
    return await Database.artist.findFirst({
        where: {id: artistId},
        include: includeAll
    });
}

export async function artistGetFromName(artistName: string) {
    return await Database.artist.findMany({
        where: {name: artistName},
        include: includeAll
    });
}


export async function artistSearchByNames(artistNameOrAlias: string) {
    // TODO
    return await Database.artist.findMany();
}

export async function artistSearchFull(query: string) {
    let nameOrAliasResult = await artistSearchByNames(query);

    let miscResult = await Database.artist.findMany({
        where: {
            OR: [
                {metadata: {description: {search: query}}},
                {metadata: {notes: {search: query}}},
                {metadata: {genre: {search: query}}}
                // {metadata: {socials: {search: query}}}
            ]
        }
    });

    return [...nameOrAliasResult, ...miscResult];
}
