/** @module ArtistMetadataDataUtils Contains data utilities for artist metadatas. */



/** The create template for artist metadatas. */
export type ArtistMetadataCreateTemplate = {
    artistAliases?: string[],
    description?: string,
    notes?: string,
    genre?: string,
    albums?: [],
    socials?: string[]
}
