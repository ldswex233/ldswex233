import {TestSummaryQuestionHandler} from "./TestSummaryQuestionHandler.mjs";

const Handler = new TestSummaryQuestionHandler();

export const TestSummaryQuestionPart = createPart(`
    <div class="element"
        ${onLoad((e) => { e.source.classList.add(e.data.correct ? 'correct' : 'wrong') })}
    >
        <div class="question">${text("question")}</div>
        <div class="review"
            ${onLoad((e) => Handler.loadReview(e.source, e.data))}
        >
        </div>
    </div>
`);

TestSummaryQuestionPart.importStyle('./src/parts/testSummaryQuestion/TestSummaryQuestionStyle.css');