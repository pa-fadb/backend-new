/** @module ArtistMetadataDataUtils Contains data utilities for artist metadatas. */


import { Prisma } from "@prisma/client"

import { AlbumCreateTemplate, albumCTToInput } from "./album"
import { ensureNotBlank } from "./other"



/** The create template for artist metadatas. */
export type ArtistMetadataCreateTemplate = {
    artistAliases?: string[],
    description?: string,
    notes?: string,
    genre?: string,
    albums?: AlbumCreateTemplate[],
    socials?: string[]
}


/**
 * Creates the input required for creating artist metadatas in Prisma.
 * 
 * @param artistMetadataCT The input create template.
 * @returns The input that can be used to create it.
 * Note that this doesn't include relations to the "upper level" (eg, no `artistId` included in the artist's metadata).
 */
export function artistMetadataCTToInput(artistMetadataCT: ArtistMetadataCreateTemplate): Prisma.ArtistMetadataCreateWithoutArtistInput {
    return {
        artistAliases: ensureNotBlank(artistMetadataCT.artistAliases),
        description: ensureNotBlank(artistMetadataCT.description),
        notes: ensureNotBlank(artistMetadataCT.notes),
        genre: ensureNotBlank(artistMetadataCT.genre),
        albums: 
            artistMetadataCT.albums !== undefined && artistMetadataCT.albums.length !== 0
            ? { create: artistMetadataCT.albums.map((albumCT) => albumCTToInput(albumCT)) }
            : undefined,
        socials: ensureNotBlank(artistMetadataCT.socials)
    }
}
