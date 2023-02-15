import WingmanState from "../state";
import WingmanSection from "./section";
import {HEADING_VIEW_SECTION} from "../view";
import {App} from "obsidian";
import {getNoteHeading} from "../lookup";


export default class WingmanSectionNoteCurrent implements WingmanSection {

    shouldRender = (_app: App, state: WingmanState) => {
        return state.currentNote !== null;
    }

    updateTo = async (app: App, state: WingmanState, container: Element) => {
        container.empty();

        // TODO: Fetch tags

        container.createEl(HEADING_VIEW_SECTION, { text: "Current Note" });
        if (state.currentNote) {
            let title = await getNoteHeading(app, state.currentNote);
            container.createEl("p", { text: title });
        } else {
            container.createEl("p", { text: "No note selected" });
        }
    }
}
