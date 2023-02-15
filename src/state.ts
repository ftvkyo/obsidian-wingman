import {TFile} from "obsidian";

import WingmanSection from "./sections/section";




export default class WingmanState {
    public sections: WingmanSection[] = [];

    public currentNote: TFile | null = null;
}
