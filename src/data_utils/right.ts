/**
 * @module RightsDataUtils Contains data utilities for rights.
 * 
 * Currently not in use due to being too simple, but still here for consistency
 * just in case there would be modifications in the future.
*/


import { Prisma } from "@prisma/client"



/** The create template for rights. */
export type RightCreateTemplate = {
    identifier: string,
    isAllowed: boolean
}


export function rightCTToInput(rightCT: RightCreateTemplate): Prisma.RightCreateWithoutArtistInput {
    return rightCT;
}
