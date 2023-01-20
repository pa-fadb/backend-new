/** @module ArtistStruct Contains data structures for artists. */
import { Prisma, Availability } from "@prisma/client"
import { ArtistMetadataCreateTemplate, artistMetadataCTToInput } from "./artistMetadata";
import { RightCreateTemplate, rightCTToInput } from "./right";
import { isBlankArray } from "../util/templateValidation";

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
