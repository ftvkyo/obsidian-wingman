import {PluginSettingTab, Setting} from "obsidian";
import WingmanPlugin from "./main";


export default class WingmanSettingsTab extends PluginSettingTab {
    constructor(
        public plugin: WingmanPlugin
    ) {
        super(plugin.app, plugin);
    }

    display() {
        let { containerEl } = this;
        containerEl.empty();

        new Setting(containerEl)
            .setName("Current note section enabled")
            .setDesc("Display information about the current note")
            .addToggle((toggle) => {
                toggle
                    .setValue(this.plugin.settings.sectionNoteCurrentEnabled)
                    .onChange(async (value) => {
                        this.plugin.settings.sectionNoteCurrentEnabled = value;
                        await this.plugin.saveSettings();
                    });
            });

        new Setting(containerEl)
            .setName("Similar notes section enabled")
            .setDesc("Display notes similar to the current one")
            .addToggle((toggle) => {
                toggle
                    .setValue(this.plugin.settings.sectionNotesSimilarEnabled)
                    .onChange(async (value) => {
                        this.plugin.settings.sectionNotesSimilarEnabled = value;
                        await this.plugin.saveSettings();
                    });
            });
    }
}
