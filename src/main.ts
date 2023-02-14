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
        this.render();
    }

    metadataCacheResolved = () => {
        // Just here for debuigging purposes, not intended logic
        if (this.state.currentNote !== null) {
            this.state.similarNotes.push(this.state.currentNote);
        }
        if (this.state.similarNotes.length > 5) {
            this.state.similarNotes.shift();
        }

        this.render();
    }

    // View Control

    render() {
        WingmanView.getView(this)?.render(this.state);
    }
}
