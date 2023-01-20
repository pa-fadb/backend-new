/** @module AlbumStruct Contains data structures for albums. */
import { Prisma } from "@prisma/client"
import { TrackCreateTemplate, trackCTToInput } from "./track"
import { isBlankArray } from "../util/templateValidation"

/** The create template for albums. */
export type AlbumCreateTemplate = {
    name: string,
    tracks?: TrackCreateTemplate[]
}

/**
 * Creates the input required for creating albums in Prisma.
 * 
 * @param albumCT The input create template.
 * @returns The input that can be used to create it.
 * Note that this doesn't include relations to the "upper level" (eg, no `artistId` included in the artist's metadata).
 */
export function albumCTToInput(albumCT: AlbumCreateTemplate): Prisma.AlbumCreateWithoutArtistMetadataInput {
    return {
        name: albumCT.name,
        tracks: 
            albumCT.tracks !== undefined && !isBlankArray(albumCT.tracks)
            ? { create: albumCT.tracks.map((trackCT) => trackCTToInput(trackCT)) }
            : undefined
    };
}
