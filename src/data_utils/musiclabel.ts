/** @module MusicLabelDataUtils Contains data utilities for music labels. */


import { Artist, Availability } from "@prisma/client"

import { ArtistCreateTemplate } from "./artist";



/** The create template for music labels. */
export type MusicLabelCreateTemplate = {
    name: string,
    availability: Availability,
    artists: ArtistCreateTemplate[]
}
