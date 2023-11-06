import {QuestionSettingsHandler} from "./QuestionSettingsHandler.mjs";
import {QuestionOptionsPart} from "../../parts/questionOptions/QuestionOptionsPart.mjs";

const Handler = new QuestionSettingsHandler();

export const QuestionSettingsComponent = createComponent(`
    <div class="question-settings">
        <div class="title">Ustawienia pytania</div>
        <div class="body">
            ${QuestionOptionsPart.toHtml()}
        </div>
    </div>
`);

QuestionSettingsComponent.importStyle('./src/components/questionSettings/QuestionSettingsStyle.css');

