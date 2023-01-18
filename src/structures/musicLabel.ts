/** @module MusicLabelDataUtils Contains data utilities for music labels. */
import { Prisma, Availability } from "@prisma/client"
import { ArtistCreateTemplate, artistCTToInput } from "./artist";
import { isBlankArray } from "../util/templateValidation";

/** The create template for music labels. */
export type MusicLabelCreateTemplate = {
    name: string,
    availability: Availability,
    artists: ArtistCreateTemplate[]
}

/**
 * Creates the input required for creating msuic labels in Prisma.
 * 
 * @param musicLabelCT The input create template.
 * @returns The input that can be used to create it.
 * Note that this doesn't include relations to the "upper level" (eg, no `artistId` included in the artist's metadata).
 */
export function musicLabelCTToInput(musicLabelCT: MusicLabelCreateTemplate): Prisma.MusicLabelCreateInput {
    return {
        name: musicLabelCT.name,
        availability: musicLabelCT.availability,
        artists:
            musicLabelCT.artists !== undefined && !isBlankArray(musicLabelCT.artists)
            ? { create: musicLabelCT.artists.map((artist) => artistCTToInput(artist)) }
            : undefined
    }
}
