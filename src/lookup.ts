import {App, TFile} from "obsidian";


export interface SimilarNote {
    note: TFile;
    tags: string[];
    matchingTags: string[];
}


// Find notes loaded in the `app` that have similarity to the `currentNote`
// Currently, similarity is defined as having at least one tag in common
// The results are sorted by the number of matching tags, higher first
export function lookupSimilarNotes(
    app: App,
    currentNote: TFile,
    excludedPaths: string[] = [],
): SimilarNote[] {
    // Take the tags of the current note from the metadata cache
    let currentTags = app.metadataCache.getFileCache(currentNote)?.tags?.map((tag) => tag.tag) ?? [];

    // If there are no tags, no similar notes can be found
    if (currentTags.length === 0) {
        return [];
    }

    // Now go through all the notes in the metadata cache and count how many
    // tags in them match the tags of the current note

    // First, get all the notes from the vault
    let notes = app.vault.getMarkdownFiles();

    // Now, for each note, find the matching tags
    let similarNotes = notes.map((note) => {
        // Get the tags from the metadata cache
        let tags = app.metadataCache.getFileCache(note)?.tags?.map((tag) => tag.tag) ?? [];
        // Count the number of matching tags
        let matchingTags = tags.filter((tag) => currentTags.includes(tag));

        return {
            note,
            tags,
            matchingTags,
        };
    })
        .filter((note) => note.matchingTags.length > 0)
        .filter((note) => note.note.path !== currentNote.path)
        .filter((note) => !excludedPaths.includes(note.note.path));

    // Finally, sort the notes by the number of matching tags, higher first
    similarNotes.sort((a, b) => b.matchingTags.length - a.matchingTags.length);

    return similarNotes;
}


// Find the first heading in the note
export async function getNoteHeading(
    app: App,
    note: TFile,
): Promise<string> {
    // We need to get the first heading from the note
    // Only h1 will be taken, and only the first one

    // First, get the content of the note
    let content = await app.vault.read(note);

    // Now, find the first h1
    let heading = content.match(/^# (.*)$/m);

    // If there is no h1, return the name of the note
    if (heading === null) {
        return note.basename;
    }

    // Otherwise, return the heading
    return heading[1];
}
