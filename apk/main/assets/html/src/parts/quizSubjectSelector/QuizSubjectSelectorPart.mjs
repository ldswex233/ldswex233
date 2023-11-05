import {QuizSubjectSelectorHandler} from "./QuizSubjectSelectorHandler.mjs";

const Handler = new QuizSubjectSelectorHandler();

export const QuizSubjectSelectorPart = createPart(`
    <div class="subject-selector no-user-select"
        ${onClick((e) => { Handler.toggle(e.part, true); })}
        ${onOuterclick((e) => { Handler.toggle(e.part, false) })}
        ${onLoad((e) => { Handler.loadOptions(e.part, e.data.options); })}
    >
        <div class="selected"
            ${onClick((e) => { Handler.toggle(e.part, true); })}
        >Nie wybrano</div>
        <div class="options" style="opacity: 0 !important; height: 0 !important;"></div>
    </div>
`);

QuizSubjectSelectorPart.importStyle('./src/parts/quizSubjectSelector/QuizSubjectSelectorStyle.css');