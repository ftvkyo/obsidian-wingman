import WingmanState from "../state";
import WingmanSection from "./section";
import {HEADING_VIEW_SECTION} from "../view";
import {App} from "obsidian";


export default class WingmanSectionNoteCurrent implements WingmanSection {

    shouldRender = (_app: App, state: WingmanState) => {
        return state.currentNote !== null;
    }

    updateTo = (_app: App, state: WingmanState, container: Element) => {
        container.empty();

        // TODO: Fecth title from the H1
        // TODO: Fetch tags

        container.createEl(HEADING_VIEW_SECTION, { text: "Current Note" });
        container.createEl("p", { text: state.currentNote?.basename ?? "No note selected" });
    }
}
