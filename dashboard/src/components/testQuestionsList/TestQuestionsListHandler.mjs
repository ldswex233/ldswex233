import {TestQuestionsListComponent} from "./TestQuestionsListComponent.mjs";
import {TestQuestionsListQuestionPart} from "../../parts/testQuestionsListQuestion/TestQuestionsListQuestionPart.mjs";
import {AppRequest} from "../../assets/mjs/AppRequest.mjs";
import {TestQuestionsOverviewLayout} from "../../layouts/testQuestionsOverview/TestQuestionsOverviewLayout.mjs";
import {ContentComponent} from "../content/ContentComponent.mjs";
import {MainLayout} from "../../layouts/main/MainLayout.mjs";
import {QuestionCreatorLayout} from "../../layouts/questionCreator/QuestionCreatorLayout.mjs";

export class TestQuestionsListHandler {
    constructor() { }

    async loadQuestions() {
        const list = TestQuestionsListComponent.toElement().querySelector(".list");
        const questions = await AppRequest.test.getQuestions(TestQuestionsOverviewLayout.data.testId);

        if(questions.length === 0) return;

        list.innerHTML = ``; // clear

        questions.forEach(question => {
            list.insertAdjacentElement(`beforeend`, TestQuestionsListQuestionPart.setData(question).toElement())
        })
    }

    /**
     *
     * @param {Number} testId
     */
    addQuestion(testId) {
        MainLayout
            .select(ContentComponent)
            .loadLayout(
                QuestionCreatorLayout
                    .setData({ testId: testId })
            )
    }
}