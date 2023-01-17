/** @module TrackDataUtils Contains data utilities for tracks. */


import { Availability } from "@prisma/client"



/** The create template for tracks. */
export type TrackCreateTemplate = {
    title: string,
    romanizedTitle?: string,
    contributors: string[],
    availability: Availability
}
