import { Plugin, TFile } from "obsidian";

import WingmanView from "./view";
import WingmanState from "./state";
import WingmanSettingsTab from "./settings-tab";
import {DEFAULT_SETTINGS} from "./settings";
import WingmanSection from "./sections/section";
import WingmanSectionNoteCurrent from "./sections/note-current";
import WingmanSectionNotesSimilar from "./sections/notes-similar";


export default class WingmanPlugin extends Plugin {

    state = new WingmanState();
    settings = DEFAULT_SETTINGS;

    sections: WingmanSection[] = [];

    // Lifecycle

    async onload() {
        await this.loadSettings();

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

        this.addSettingTab(new WingmanSettingsTab(this));

        this.registerEvent(this.app.workspace.on("file-open", this.fileOpen));
        this.registerEvent(this.app.metadataCache.on("resolved", this.metadataCacheResolved));

        this.sections = [
            new WingmanSectionNoteCurrent(this),
            new WingmanSectionNotesSimilar(this),
        ];
    }

    onunload() {
        WingmanView.remove(this);
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
        this.update();
    }

    async saveSettings() {
        await this.saveData(this.settings);
        this.update();
    }

    // Event Handlers

    fileOpen = (file: TFile | null) => {
        this.state.currentNote = file;
        this.update();
    }

    metadataCacheResolved = () => {
        this.update();
    }

    // View Control

    update() {
        WingmanView.getView(this)?.update();
    }
}
