import {TestQuestionsListHandler} from "./TestQuestionsListHandler.mjs";
import {TestQuestionsOverviewLayout} from "../../layouts/testQuestionsOverview/TestQuestionsOverviewLayout.mjs";

const Handler = new TestQuestionsListHandler();

export const TestQuestionsListComponent = createComponent(`
    <div class="questions-list">
        <div class="title">Lista pytań</div>
        <div class="list"
            ${onLoad(() => { Handler.loadQuestions(); })}
        >
            <span class="info">Brak pytań w tym teście</span>
        </div>
        <button
            ${onClick((e) => { Handler.addQuestion(TestQuestionsOverviewLayout.data.testId); })}
        >Dodaj pytanie</button>
    </div>
`);

TestQuestionsListComponent.importStyle('./src/components/testQuestionsList/TestQuestionsListStyle.css');

