/** @module MusicLabelStructs Contains structures for music labels. */
import { Prisma, Availability } from "@prisma/client"
import { Database } from "../../prisma";
import { ArtistCreateTemplate, artistCTToInput } from "./artist";
import { isBlankArray, ensureNotBlankString } from "../util/templateValidation";

/** The create template for music labels. */
export type MusicLabelCreateTemplate = {
    name: string,
    availability: Availability,
    artists: ArtistCreateTemplate[]
}

/**
 * Creates the input required for creating msuic labels in Prisma.
 * 
 * @param musicLabelCT The input create template.
 * @returns The input that can be used to create it.
 * Note that this doesn't include relations to the "upper level" (eg, no `artistId` included in the artist's metadata).
 */
export function musicLabelCTToInput(musicLabelCT: MusicLabelCreateTemplate): Prisma.MusicLabelCreateInput {
    return {
        name: musicLabelCT.name,
        availability: musicLabelCT.availability,
        artists:
            musicLabelCT.artists !== undefined && !isBlankArray(musicLabelCT.artists)
            ? { create: musicLabelCT.artists.map((artist) => artistCTToInput(artist)) }
            : undefined
    }
}

export type MusicLabelUpdateTemplate = {
    name?: string,
    availability?: Availability,
    artists?: ArtistCreateTemplate[]
}

export function musicLabelUTToInput(musicLabelUT: MusicLabelUpdateTemplate): Prisma.MusicLabelUpdateInput {
    return {
        name: ensureNotBlankString(musicLabelUT.name),
        availability: musicLabelUT.availability,
        artists:
            musicLabelUT.artists !== undefined && !isBlankArray(musicLabelUT.artists)
            ? { create: musicLabelUT.artists.map((artist) => artistCTToInput(artist)) }
            : undefined
    }
}

/** When used in a query, includes all relation s that the artist has on return. */
export let musicLabelQueryIncludeAll: Prisma.MusicLabelInclude = {
    artists: true
}

/** The music label structure. */
export class MusicLabelStruct {
    /**
     * Creates a music label in the database using a template.
     * 
     * @param artistCT The create template.
     * @returns The music label.
     */
    static async create(musicLabelCT: MusicLabelCreateTemplate) {
        return await Database.musicLabel.create({
            data: musicLabelCTToInput(musicLabelCT),
            include: musicLabelQueryIncludeAll,
        })
    }

    /**
     * Updates a music label in the database using a template.
     * 
     * @param artistUT The update template.
     * @returns The music label.
     */
    static async update(musicLabelID: number, musicLabelUT: MusicLabelUpdateTemplate) {
        return await Database.musicLabel.update({
            where: { id: musicLabelID },
            data: musicLabelUTToInput(musicLabelUT),
            include: musicLabelQueryIncludeAll
        })
    }
}
