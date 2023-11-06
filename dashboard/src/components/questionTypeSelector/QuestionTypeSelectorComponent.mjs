import {QuestionTypeSelectorHandler} from "./QuestionTypeSelectorHandler.mjs";

const Handler = new QuestionTypeSelectorHandler();

export const QuestionTypeSelectorComponent = createComponent(`
    <div class="question-type">
        <div class="title">Wybór typu pytania</div>
        <div class="body"
            ${onLoad((e) => { Handler.loadQuestionTypeSelector(e.source); })}
        >
            
        </div>
    </div>
`);

QuestionTypeSelectorComponent.importStyle('./src/components/questionTypeSelector/QuestionTypeSelectorStyle.css');

