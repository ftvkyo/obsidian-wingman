import WingmanSection from "./section";
import {HEADING_VIEW_SECTION, HEADING_VIEW_SUBSECTION} from "../view";
import {getNoteHeading, lookupSimilarNotes} from "../lookup";
import WingmanPlugin from "../main";


export default class WingmanSectionNotesSimilar implements WingmanSection {
    constructor(
        public plugin: WingmanPlugin,
    ) {}

    shouldRender = () => {
        let sectionEnabled = this.plugin.settings.sectionNotesSimilarEnabled;
        let currentNoteExists = this.plugin.state.currentNote !== null;
        return sectionEnabled && currentNoteExists;
    }

    updateTo = async (container: Element) => {
        container.empty();

        container.createEl(HEADING_VIEW_SECTION, { text: "Similar Notes" });

        let currentNote = this.plugin.state.currentNote;
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
                    let link = li.createEl("a", { text: noteTitle, cls: "internal-link", title: note.note.path });
                    link.addEventListener("click", async () => {
                        await app.workspace.getLeaf(false).openFile(note.note);
                    });
                    li.createEl("p", { text: note.matchingTags.join(", ") });
                }

                return;
            }
        }

        container.createEl("p", { text: "No similar notes found." });
    }
}
