import WingmanSection from "./section";
import {HEADING_VIEW_SECTION} from "../view";
import {getNoteHeading} from "../lookup";
import WingmanPlugin from "../main";


export default class WingmanSectionNoteCurrent implements WingmanSection {
    constructor(
        public plugin: WingmanPlugin,
    ) {}

    shouldRender = () => {
        let sectionEnabled = this.plugin.settings.sectionNoteCurrentEnabled;
        let currentNoteExists = this.plugin.state.currentNote !== null;
        return sectionEnabled && currentNoteExists;
    }

    updateTo = async (container: Element) => {
        container.empty();

        // TODO: Fetch tags

        container.createEl(HEADING_VIEW_SECTION, { text: "Current Note" });
        if (this.plugin.state.currentNote) {
            let title = await getNoteHeading(app, this.plugin.state.currentNote);
            container.createEl("p", { text: title });
        } else {
            container.createEl("p", { text: "No note selected" });
        }
    }
}
