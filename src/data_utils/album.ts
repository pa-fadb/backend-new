/** @module AlbumDataUtils Contains data utilities for albums. */


import { TrackCreateTemplate } from "./track"



/** The create template for albums. */
export type AlbumCreateTemplate = {
    name: string,
    tracks: TrackCreateTemplate[]
}
