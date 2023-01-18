/** @module RightsDataUtils Contains data utilities for rights. */
import { Prisma } from "@prisma/client"

/** The create template for rights. */
export type RightCreateTemplate = {
    identifier: string,
    isAllowed: boolean
}

export function rightCTToInput(rightCT: RightCreateTemplate): Prisma.RightCreateWithoutArtistInput {
    return rightCT;
}
