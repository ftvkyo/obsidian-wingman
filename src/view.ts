import { ItemView, Plugin, WorkspaceLeaf } from "obsidian";

import WingmanPlugin from "./main";


export const HEADING_VIEW = "h4";
export const HEADING_VIEW_SECTION = "h5";
export const HEADING_VIEW_SUBSECTION = "h6";

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

    constructor(
        public plugin: WingmanPlugin,
        leaf: WorkspaceLeaf
    ) {
        super(leaf);
    }

    async onOpen() {
        // Show a welcome message.
        let container = this.prepareRenderingContainer();
        container.createEl("p", { text: "Welcome to Wingman!" });
        container.createEl("p", { text: "Start editing and see your suggestions here." });
    }

    async onClose() {}

    /***********
     * Helpers *
     ***********/

    static register(plugin: WingmanPlugin) {
        plugin.registerView(
            VIEW_TYPE_WINGMAN,
            (leaf) => new WingmanView(plugin, leaf)
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

    /*********************
     * Rendering methods *
     *********************/

    private prepareRenderingContainer(): Element {
        let container = this.containerEl.children[1];
        container.empty();
        container.createEl(HEADING_VIEW, { text: "Wingman" });
        return container;
    }

    // Re-render the view with a state
    update() {
        let container = this.prepareRenderingContainer();

        for (let section of this.plugin.sections) {
            if (section.shouldRender()) {
                section.updateTo(container.createEl("section"));
            }
        }
    }
}
