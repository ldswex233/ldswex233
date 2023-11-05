import {QuestionContainerHandler} from "./QuestionContainerHandler.mjs";

const Handler = new QuestionContainerHandler();

export const QuestionContainerComponent = createComponent(`
    <div class="question">
        <div class="header">
            <button ripple
                ${onClick(() => Handler.exit())}
            >
                <i class="fa-solid fa-xmark"></i>
            </button>
            <div class="progress">
                <div class="element">
                    <div class="bar" style="width: 0%;"></div>
<!--                    <div class="bar-icon"><i class="tim-icons icon-atom"></i></div>-->
                </div>
            </div>
<!--            <div class="counter">13</div>-->
        </div>
        <div class="slider"></div>
    </div>
`);

QuestionContainerComponent.importStyle('./src/components/questionContainer/QuestionContainerStyle.css');

