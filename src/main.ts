import { Plugin, TAbstractFile } from "obsidian";

import WingmanView from "./view";

import "./style.css";


export default class MyPlugin extends Plugin {

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
    }

    onunload() {
        WingmanView.remove(this);
    }

    // Event Handlers

    vaultCreate = (file: TAbstractFile) => {
        this.update(`Created: ${file.path}`);
    }

    vaultDelete = (file: TAbstractFile) => {
        this.update(`Deleted: ${file.path}`);
    }

    vaultRename = (file: TAbstractFile, oldPath: string) => {
        this.update(`Renamed: ${oldPath} -> ${file.path}`);
    }

    vaultModify = (file: TAbstractFile) => {
        this.update(`Modified: ${file.path}`);
    }

    // View Control

    update(text: string) {
        WingmanView.getView(this)?.update({text});
    }
}
