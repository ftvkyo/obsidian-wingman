import WingmanPlugin from "../main";


export default interface WingmanSection {
    plugin: WingmanPlugin;

    // Whether the section should be rendered.
    shouldRender: () => boolean;

    // Render the section to an element.
    updateTo: (container: Element) => Promise<void>;
}
