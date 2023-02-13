import { ItemView, Plugin, WorkspaceLeaf } from "obsidian";


export interface WingmanViewState {
    text: string;
}


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
        this.update({text: ""});
    }

    async onClose() {
        // Nothing to clean up.
    }

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

    /*********
     * State *
     *********/

    update(state: WingmanViewState) {
        const container = this.containerEl.children[1];
        container.empty();
        container.createEl("h4", { text: "Wingman" });
        container.createEl("p", { text: state.text });
    }
}
