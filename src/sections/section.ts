import {App} from "obsidian";
import WingmanState from "../state";


export default interface WingmanSection {
    // Whether the section should be rendered.
    shouldRender: (
        app: App,
        state: WingmanState,
    ) => boolean;

    // Render the section to an element.
    updateTo: (
        app: App,
        state: WingmanState,
        container: Element,
    ) => Promise<void>;
}
