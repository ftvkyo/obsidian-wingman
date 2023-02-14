export class WingmanSection {
    constructor(
        readonly order: number,
        public title: string,
        public content: string,
        public visible: boolean = true,
    ) {}
}


export default class WingmanState {

    sections: WingmanSection[] = [];

    // Add a section to the view.
    // Order of the section should be unique.
    // It will determine the order of the section in the view.
    sectionAdd(section: WingmanSection) {
        // Check that a section with the same order does not exist.
        if (this.sections.some((s) => s.order === section.order)) {
            throw new Error(`Section with order ${section.order} already exists.`);
        }

        this.sections.push(section);
        this.sections.sort((a, b) => a.order - b.order);
    }

    // Remove a section from the view.
    sectionRemove(order: number) {
        this.sections = this.sections.filter((s) => s.order !== order);
    }

    // Get a section from the view by its order.
    sectionGet(order: number) {
        return this.sections.find((s) => s.order === order);
    }
}
