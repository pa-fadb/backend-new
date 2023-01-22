/** @module RightsStructs Contains structures for rights. */
import { Prisma } from "@prisma/client"

/** The create template for rights. */
export type RightCreateTemplate = {
    identifier: string,
    isAllowed: boolean
}

/**
 * Creates the input required for creating rights in Prisma.
 * 
 * @param rightCT The input create template.
 * @returns The input that can be used to create it.
 * Note that this doesn't include relations to the "upper level" (eg, no `artistId` included in the artist's metadata).
 */
export function rightCTToInput(rightCT: RightCreateTemplate): Prisma.RightCreateWithoutArtistInput {
    return rightCT;
}
