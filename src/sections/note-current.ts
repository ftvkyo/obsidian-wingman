import WingmanState from "../state";
import WingmanSection from "./section";
import {HEADING_VIEW_SECTION} from "../view";


export default class WingmanSectionNoteCurrent implements WingmanSection {

    shouldRender = (state: WingmanState) => {
        return state.currentNote !== null;
    }

    renderTo = (state: WingmanState, container: Element) => {
        container.empty();

        container.createEl(HEADING_VIEW_SECTION, { text: "Current Note" });
        container.createEl("p", { text: state.currentNote?.basename ?? "No note selected" });
    }
}
