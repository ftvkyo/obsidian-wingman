import WingmanState from "../state";
import WingmanSection from "./section";
import {HEADING_VIEW_SECTION} from "../view";


export default class WingmanSectionNotesSimilar implements WingmanSection {

    shouldRender = (state: WingmanState) => {
        return state.currentNote !== null;
    }

    renderTo = (state: WingmanState, container: Element) => {
        container.empty();

        container.createEl(HEADING_VIEW_SECTION, { text: "Similar Notes" });
        let list = container.createEl("ol");

        for (let note of state.similarNotes) {
            let li = list.createEl("li");
            li.createEl("a", { text: note.basename, href: note.path });
        }
    }

}
