import {SelectorPart} from "../../parts/selector/SelectorPart.mjs";
import {NotificationError} from "../../plugins/notification/notification.js";
import {TestsListHandler} from "../testsList/TestsListHandler.mjs";
import {TestsListComponent} from "../testsList/TestsListComponent.mjs";
import {AppRequest} from "../../assets/mjs/AppRequest.mjs";

export class TestCreatorHandler {
    constructor() {
        this.testNameInput = null;
        this.selectedSubjectId = null;
    }

    setTestNameInput(element) {
        this.testNameInput = element;
    }

    async loadSubjectSelector(source) {
        const request = await AppRequest.subject.getAll();

        let subjects = Object.values(request.subjects)

        subjects  = subjects.map((e) => {
            return {
                id: e.id,
                name: e.name,
                onClick: () => { this.selectedSubjectId = e.id }
            }
        })

        source.insertAdjacentElement(`beforeend`, SelectorPart.setData({ options: subjects }).toElement())
    }

    async createTest() {
        if(this.testNameInput.value.trim() === '') {
            return new NotificationError(`Nie wybrano nazwy testu`)
        }

        if(this.selectedSubjectId === null) {
            return new NotificationError(`Nie wybrano przedmiotu`)
        }

        await AppRequest.test.create(this.selectedSubjectId, this.testNameInput.value.trim());

        // reset
        this.testNameInput.value = ''
        this.selectedSubjectId = null;

        await new TestsListHandler().loadTests(TestsListComponent.toElement());
    }
}