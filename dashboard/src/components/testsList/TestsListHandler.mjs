import {TestsListTestPart} from "../../parts/testsListTest/TestsListTestPart.mjs";
import {SelectorPart} from "../../parts/selector/SelectorPart.mjs";
import {TestsListComponent} from "./TestsListComponent.mjs";
import {AppRequest} from "../../assets/mjs/AppRequest.mjs";

export class TestsListHandler {
    constructor() { }

    /**
     *
     * @param {HTMLElement} component
     * @param {String} field
     * @param {Number} value
     */
    filterElements(component, field, value) {
        const list = component.querySelector(".list");
        const children = Array.from(list.children)
        const displayAll = value === null;

        if(displayAll) { return children.forEach((c) => c.style.display = ''); }

        children.forEach(child => {
            const hasField = parseInt(child.getAttribute(field)) === value;

            child.style.display = (hasField ? '' : 'none')
        })
    }

    async loadSubjectsFilter() {
        const header = TestsListComponent.toElement().querySelector(".header");
        const request = await AppRequest.subject.getAll();

        let subjects = [{ id: null, name: "Wszystkie" }, ...Object.values(request.subjects)]

        subjects  = subjects.map((e) => {
            return {
                id: e.id,
                name: e.name,
                onClick: () => { this.filterElements(TestsListComponent.toElement(), "subjectId", e.id) }
            }
        })

        header.insertAdjacentElement(`beforeend`, SelectorPart.setData({ options: subjects }).toElement())
    }

    async loadTests() {
        const list = TestsListComponent.toElement().querySelector(".list");

        const testRequest = (await AppRequest.test.getAll()).tests;
        const subjectRequest = (await AppRequest.subject.getAll()).subjects;

        const tests = Object.values(testRequest).map(e => {
            e.subject = { id: e.subjectId, name: subjectRequest[e.subjectId].name };
            return e;
        });

        list.innerHTML = ``; // clear

        tests.forEach(test => {
            list.insertAdjacentElement(`beforeend`, TestsListTestPart.setData(test).toElement())
        })
    }
}