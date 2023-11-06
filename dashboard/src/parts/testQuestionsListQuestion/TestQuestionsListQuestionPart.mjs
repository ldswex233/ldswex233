import {TestQuestionsListQuestionHandler} from "./TestQuestionsListQuestionHandler.mjs";

const Handler = new TestQuestionsListQuestionHandler();

export const TestQuestionsListQuestionPart = createPart(`
    <div class="element"
        ${onOuterclick((e) => { Handler.toggleTestTitleInput(e.part, false) })}
        ${onDblclick((e) => { Handler.toggleTestTitleInput(e.part, true) })}
    >
        <div class="title">
            <div class="main">${text("question")}</div>
            <div class="sub">${text("type")}</div>
        </div>
        <div class="buttons">
            <button
                ${onClick((e) => { Handler.delete(e.part, e.data.id) })}
            ><i class="fa-regular fa-trash-can"></i></button>
            <button>
                <i class="fa-regular fa-pen-to-square"></i>
            </button>
        </div>
    </div>
`);

// Imported from TestsListTestPart
TestQuestionsListQuestionPart.importStyle('./src/parts/testsListTest/TestsListTestStyle.css');