import {App, TFile} from "obsidian";


export interface SimilarNote {
    note: TFile;
    matchingTags: string[];
}


export function lookupSimilarNotes(
    app: App,
    currentNote: TFile,
): SimilarNote[] {
    // Take the tags of the current note from the metadata cache
    let currentTags = app.metadataCache.getFileCache(currentNote)?.tags?.map((tag) => tag.tag) ?? [];

    // If there are no tags, return an empty array
    if (currentTags.length === 0) {
        return [];
    }

    // Now go through all the notes in the metadata cache and count how many
    // tags in them match the tags of the current note

    // First, get all the notes from the vault
    let notes = app.vault.getMarkdownFiles();
    // Now, for each note, find the matching tags
    return notes.map((note) => {
        // Get the tags from the metadata cache
        let tags = app.metadataCache.getFileCache(note)?.tags?.map((tag) => tag.tag) ?? [];
        // Count the number of matching tags
        let matchingTags = tags.filter((tag) => currentTags.includes(tag));

        return {
            note,
            matchingTags,
        };
    })
    .filter((note) => note.matchingTags.length > 0)
    .filter((note) => note.note.path !== currentNote.path);
}
