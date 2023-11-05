import {AppRequest} from "../../../assets/mjs/AppRequest.mjs";
import {QuizLayout} from "../../../layouts/quiz/QuizLayout.mjs";
import {MainLayout} from "../../../layouts/main/MainLayout.mjs";
import {ContainerComponent} from "../../container/ContainerComponent.mjs";

export class QuizesMap {
    constructor() {
    }

    /**
     *
     * @param {Number} subjectId
     * @param {HTMLElement} structures
     */
    async loadMap(subjectId, structures) {
        structures.innerHTML = ``;

        const subject = await AppRequest.subject.getSubject(subjectId);
        const points = subject.tests.map((e) => {
            return { testId: e.id, name: e.name, done: e.doneByUser }
        })

        for(const [i, point] of points.entries()) {
            const flipSide = ((i + 1) % 2 === 0);

            const MARGIN_X = `10vw`;
            const MARGIN_Y = `15vh`;

            const styleClass = (point.done ? 'active' : 'gray-out');
            const fromRight = `calc(100vw - 30vw - ${MARGIN_X})`;
            const fromLeft = `${MARGIN_X}`;

            const button = createElement(`
                <div class="point ${styleClass} no-user-select" style="transform: translate(${(flipSide ? fromLeft : fromRight)}, calc(${i} * ${MARGIN_Y}))"> 
                    <img src="${asset(`images/islands/${i + 1}.png`)}" alt="">
                    <p>${point.name}</p>
                </div>
            `).toElement()

            button.addEventListener('click', (e) => {
                MainLayout
                    .select(ContainerComponent)
                    .loadLayout(QuizLayout.setData({ testId: point.testId }))
            })

            structures.insertAdjacentElement(`beforeend`, button);
        }
    }
}