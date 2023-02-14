import { Plugin, TFile } from "obsidian";

import WingmanView from "./view";
import WingmanState from "./state";
import WingmanSectionNoteCurrent from "./sections/note-current";
import WingmanSectionNotesSimilar from "./sections/notes-similar";

import "./style.css";


export default class MyPlugin extends Plugin {

    state = new WingmanState();

    sectionNoteCurrent = new WingmanSectionNoteCurrent();
    sectionNotesSimilar = new WingmanSectionNotesSimilar();

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

        this.registerEvent(this.app.workspace.on("file-open", this.fileOpen));
        this.registerEvent(this.app.metadataCache.on("resolved", this.metadataCacheResolved));

        this.state.sections = [
            this.sectionNoteCurrent,
            this.sectionNotesSimilar,
        ];
    }

    onunload() {
        WingmanView.remove(this);
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
        WingmanView.getView(this)?.update(this.app, this.state);
    }
}
