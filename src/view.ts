import { ItemView, Plugin, WorkspaceLeaf } from "obsidian";
import WingmanState, { WingmanSection } from "./state";


export const VIEW_TYPE_WINGMAN = "wingman-plugin";

export default class WingmanView extends ItemView {

    /************
     * Settings *
     ************/

    // Not intended to be "navigated away".
    navigation = false;

    getViewType() {
        return VIEW_TYPE_WINGMAN;
    }

    // Friendly name
    getDisplayText() {
        return "Wingman Obsidian Plugin";
    }

    /*************
     * Lifecycle *
     *************/

    constructor(leaf: WorkspaceLeaf) {
        super(leaf);
    }

    async onOpen() {
        // Show a welcome message.
        let container = this.prepareRenderingContainer();
        this.renderSection(container, new WingmanSection(
            -1,
            "The plugin is ready",
            "Start editing and suggestions will appear here."
        ));
    }

    async onClose() {}

    /***********
     * Helpers *
     ***********/

    static register(plugin: Plugin) {
        plugin.registerView(
            VIEW_TYPE_WINGMAN,
            (leaf) => new WingmanView(leaf)
        );
    }

    static async add(plugin: Plugin) {
        this.remove(plugin);

        await plugin.app.workspace.getRightLeaf(false).setViewState({
            type: VIEW_TYPE_WINGMAN,
            active: true,
        });
    }

    static remove(plugin: Plugin) {
        plugin.app.workspace.detachLeavesOfType(VIEW_TYPE_WINGMAN);
    }

    static reveal(plugin: Plugin) {
        let leaf = this.getLeaf(plugin);
        if (leaf) {
            plugin.app.workspace.revealLeaf(leaf);
        }
    }

    static getLeaf(plugin: Plugin): WorkspaceLeaf | null {
        let leaves =  plugin.app.workspace.getLeavesOfType(VIEW_TYPE_WINGMAN);
        return leaves[0] ?? null;
    }

    static getView(plugin: Plugin): WingmanView | null {
        let leaf = this.getLeaf(plugin);
        return leaf?.view as WingmanView | null;
    }

    private prepareRenderingContainer(): Element {
        let container = this.containerEl.children[1];
        container.empty();
        container.createEl("h3", { text: "Wingman" });
        return container;
    }

    /*********************
     * Rendering methods *
     *********************/

    // Re-render the view with a state
    render(state: WingmanState) {
        let container = this.prepareRenderingContainer();

        for (let section of state.sections) {
            this.renderSection(container, section);
        }
    }

    // Render a section in the container.
    private renderSection(container: Element, section: WingmanSection) {
        let div = container.createDiv("wingman-section");
        div.createEl("h4", { text: section.title });
        div.createEl("p", { text: section.content });
    }
}
