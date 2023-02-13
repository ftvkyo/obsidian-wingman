import { Plugin } from "obsidian";

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
    }

    onunload() {
        WingmanView.remove(this);
    }
}
