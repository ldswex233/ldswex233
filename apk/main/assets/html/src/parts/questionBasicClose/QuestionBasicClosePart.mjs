import {QuestionBasicCloseHandler} from "./QuestionBasicCloseHandler.mjs";

const Handler = new QuestionBasicCloseHandler();

export const QuestionBasicClosePart = createPart(`
    <div class="multiple-choice">
        <div class="task">
            <div class="text">${text(`question.text`)}</div>
        </div>
        <div class="options"
            ${onLoad((e) => { Handler.loadOptions(e.source, e.data) })}
        >
        </div>
        <button ripple
            ${onClick(() => Handler.next())}
        >Dalej</button>
    </div>
`);

QuestionBasicClosePart.importStyle('./src/parts/questionBasicClose/QuestionBasicCloseStyle.css');