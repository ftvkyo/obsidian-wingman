import { App, ItemView, Plugin, WorkspaceLeaf } from "obsidian";

import WingmanState from "./state";


export const HEADING_VIEW = "h4";
export const HEADING_VIEW_SECTION = "h5";

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
        container.createEl("p", { text: "Welcome to Wingman!" });
        container.createEl("p", { text: "Start editing and see your suggestions here." });
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
        container.createEl(HEADING_VIEW, { text: "Wingman" });
        return container;
    }

    /*********************
     * Rendering methods *
     *********************/

    // Re-render the view with a state
    update(app: App, state: WingmanState) {
        let container = this.prepareRenderingContainer();

        for (let section of state.sections) {
            let sectionElement = container.createEl("section");
            section.updateTo(app, state, sectionElement);
        }
    }
}
