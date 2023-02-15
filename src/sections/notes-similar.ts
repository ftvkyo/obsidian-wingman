import WingmanState from "../state";
import WingmanSection from "./section";
import {HEADING_VIEW_SECTION, HEADING_VIEW_SUBSECTION} from "../view";
import {App} from "obsidian";
import {getNoteHeading, lookupSimilarNotes} from "../lookup";


export default class WingmanSectionNotesSimilar implements WingmanSection {

    shouldRender = (_app: App, state: WingmanState) => {
        return state.currentNote !== null;
    }

    updateTo = async (app: App, state: WingmanState, container: Element) => {
        container.empty();

        container.createEl(HEADING_VIEW_SECTION, { text: "Similar Notes" });

        let currentNote = state.currentNote;
        if (currentNote) {
            let similarNotes = lookupSimilarNotes(app, currentNote);

            if (similarNotes.length > 0) {
                // Helper function to create a new subsection
                let nextSubsection = (matchingTags: number) => {
                    container.createEl(HEADING_VIEW_SUBSECTION, { text: `${matchingTags} matching tags` });
                    let list = container.createEl("ul");
                    return {
                        matchingTags,
                        list,
                    };
                };

                let currentSection = nextSubsection(similarNotes[0].matchingTags.length);

                // Sort notes out to different sections based on how many tags they have in common with the current note
                for (let note of similarNotes) {
                    // When the number of matching tags changes, create a new list
                    if (note.matchingTags.length < currentSection.matchingTags) {
                        currentSection = nextSubsection(note.matchingTags.length);
                    }

                    let li = currentSection.list.createEl("li");
                    let noteTitle = await getNoteHeading(app, note.note);
                    li.createEl("a", { text: noteTitle, href: note.note.path });
                    li.createEl("p", { text: note.matchingTags.join(", ") });
                }

                return;
            }
        }

        container.createEl("p", { text: "No similar notes found." });
    }
}
