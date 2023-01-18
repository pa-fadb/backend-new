/** @module TrackDataUtils Contains data utilities for tracks. */
import { Prisma } from "@prisma/client"
import { Availability } from "@prisma/client"
import { ensureNotBlankString, ensureNotBlankStringArray } from "../util/templateValidation"

/** The create template for tracks. */
export type TrackCreateTemplate = {
    title: string,
    romanizedTitle?: string,
    contributors?: string[],
    availability: Availability
}

/**
 * Creates the input required for creating tracks in Prisma.
 * 
 * @param trackCT The input create template.
 * @returns The input that can be used to create it.
 * Note that this doesn't include relations to the "upper level" (eg, no `artistId` included in the artist's metadata).
 */
export function trackCTToInput(trackCT: TrackCreateTemplate): Prisma.TrackCreateWithoutAlbumInput {
    return {
        title: trackCT.title,
        romanizedTitle: ensureNotBlankString(trackCT.romanizedTitle),
        contributors: ensureNotBlankStringArray(trackCT.contributors),
        availability: trackCT.availability
    };
}

