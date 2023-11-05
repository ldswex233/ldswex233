import {QuizesHandler} from "./QuizesHandler.mjs";
import {QuizesMap} from "./script/QuizesMap.mjs";

const Handler = new QuizesHandler();

export const QuizesComponent = createComponent(`
    <div class="quizes">
        <div class="selector">
            <button ripple
                ${onClick((e) => { Handler.openFileSelector() })}
            >
                <img src="${asset(`svg/plus.svg`)}" alt="">
            </button>
        </div>
        <div class="map">
            <div class="structures" style="height: 1000px;"></div>
        </div>
    </div>
`);

QuizesComponent.onLoad(async () => {
    const map = new QuizesMap();

    await Handler.loadSubjectSelector(map);
})

QuizesComponent.importStyle('./src/components/quizes/QuizesStyle.css');

