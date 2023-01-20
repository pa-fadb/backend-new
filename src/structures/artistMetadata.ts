/** @module ArtistMetadataStructs Contains structures for artist metadatas. */
import { Prisma } from "@prisma/client"
import { AlbumCreateTemplate, albumCTToInput } from "./album"
import { isBlankArray, ensureNotBlankString, ensureNotBlankStringArray } from "../util/templateValidation"

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
        artistAliases: ensureNotBlankStringArray(artistMetadataCT.artistAliases),
        description: ensureNotBlankString(artistMetadataCT.description),
        notes: ensureNotBlankString(artistMetadataCT.notes),
        genre: ensureNotBlankString(artistMetadataCT.genre),
        albums: 
            artistMetadataCT.albums !== undefined && !isBlankArray(artistMetadataCT.albums)
            ? { create: artistMetadataCT.albums.map((albumCT) => albumCTToInput(albumCT)) }
            : undefined,
        socials: ensureNotBlankStringArray(artistMetadataCT.socials)
    }
}
