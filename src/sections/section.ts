import WingmanState from "../state";


export default interface WingmanSection {
    // Whether the section should be rendered.
    shouldRender: (
        state: WingmanState,
    ) => boolean;

    // Render the section to an element.
    renderTo: (
        state: WingmanState,
        container: Element,
    ) => void;
}
