import { Plugin, TAbstractFile } from "obsidian";

import WingmanView from "./view";
import WingmanState from "./state";

import "./style.css";


const SECTION_SIMILAR_NOTES = 1;


export default class MyPlugin extends Plugin {

    state = new WingmanState();

    // Lifecycle

    async onload() {
        WingmanView.register(this);

        this.app.workspace.onLayoutReady(() => {
            WingmanView.add(this);
        });

        this.addCommand({
            id: "view-focus",
            name: "Focus view",
            callback: () => {
                WingmanView.reveal(this);
            }
        });

        this.registerEvent(this.app.vault.on("create", this.vaultCreate));
        this.registerEvent(this.app.vault.on("delete", this.vaultDelete));
        this.registerEvent(this.app.vault.on("rename", this.vaultRename));
        this.registerEvent(this.app.vault.on("modify", this.vaultModify));

        this.state.sectionAdd({
            order: SECTION_SIMILAR_NOTES,
            title: "Similar Notes",
            content: "No similar notes found.",
            visible: false,
        });
    }

    onunload() {
        WingmanView.remove(this);
    }

    // Event Handlers

    vaultCreate = (file: TAbstractFile) => {
        this.updateSection(SECTION_SIMILAR_NOTES, `Created: ${file.path}`);
    }

    vaultDelete = (file: TAbstractFile) => {
        this.updateSection(SECTION_SIMILAR_NOTES, `Deleted: ${file.path}`);
    }

    vaultRename = (file: TAbstractFile, oldPath: string) => {
        this.updateSection(SECTION_SIMILAR_NOTES, `Renamed: ${oldPath} -> ${file.path}`);
    }

    vaultModify = (file: TAbstractFile) => {
        this.updateSection(SECTION_SIMILAR_NOTES, `Modified: ${file.path}`);
    }

    // View Control

    updateSection(sectionOrder: number, text: string) {
        let section = this.state.sectionGet(sectionOrder);
        if (section) {
            section.visible = true;
            section.content = text;
        }
        WingmanView.getView(this)?.render(this.state);
    }
}
