import WingmanState from "../state";
import WingmanSection from "./section";
import {HEADING_VIEW_SECTION} from "../view";
import {App} from "obsidian";
import {lookupSimilarNotes} from "../lookup";


export default class WingmanSectionNotesSimilar implements WingmanSection {

    shouldRender = (_app: App, state: WingmanState) => {
        return state.currentNote !== null;
    }

    updateTo = (app: App, state: WingmanState, container: Element) => {
        container.empty();

        container.createEl(HEADING_VIEW_SECTION, { text: "Similar Notes" });

        let currentNote = state.currentNote;
        if (currentNote) {
            let similarNotes = lookupSimilarNotes(app, currentNote);

            let list = container.createEl("ol");
            for (let note of similarNotes) {
                let li = list.createEl("li");
                li.createEl("a", { text: note.note.basename, href: note.note.path });

                let ul = li.createEl("ul");
                for (let tag of note.matchingTags) {
                    ul.createEl("li", { text: tag });
                }
            }
        } else {
            container.createEl("p", { text: "No similar notes found." });
        }

    }

}
