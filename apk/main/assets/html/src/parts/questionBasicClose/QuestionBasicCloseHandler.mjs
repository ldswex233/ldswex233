import {Slider} from "../../components/slider/script/SliderScript.mjs";
import {QuestionContainerHandler} from "../../components/questionContainer/QuestionContainerHandler.mjs";
import {QuizLayout} from "../../layouts/quiz/QuizLayout.mjs";
import {TestSummaryHandler} from "../testSummary/TestSummaryHandler.mjs";

export class QuestionBasicCloseHandler {
    constructor() { }

    /**
     *
     * @param {HTMLElement} source
     * @param {{ question: { id: number, text: string }, options: Array<{string}> }} data
     */
    loadOptions(source, data) {
        const { options, isMultiple, allowRandom } = data;

        let parsedOptions = options.map((e, i) => { return { realIndex: i + 1, text: e } })

        function shuffle(array) {
            let currentIndex = array.length,  randomIndex;
            while (currentIndex > 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
            }

            return array;
        }

        (allowRandom ? shuffle(parsedOptions) : parsedOptions).forEach((option) => {
            const checkboxMultipleClass = isMultiple ? 'square' : 'circle';

            const button = createElement(`
                <button ripple>
                    <div class="checkbox ${checkboxMultipleClass}"></div>
                    <span class="text">${option.text}</span>
                </button>
            `).toElement();

            button.addEventListener('click', async () => {
                if(!(data.question.id in QuizLayout.data.answers)) {
                    QuizLayout.data.answers[data.question.id] = []
                }

                if(!isMultiple) {
                    Array.from(source.children).forEach(c => c.classList.remove("active"))

                    QuizLayout.data.answers[data.question.id] = []
                }

                QuizLayout.data.answers[data.question.id].push(option.realIndex)

                const hasActive = button.classList.contains("active");

                button.className = (hasActive ? '' : 'active');
            });

            source.insertAdjacentElement(`beforeend`, button);
        })
    }

    next() {
        const slider = new Slider();
        const nextSlideNumber = slider.getActiveSlide() + 1;
        const isOutOfRange = nextSlideNumber >= slider.getSlides().length
        const isPenultimateSlide = nextSlideNumber === slider.getSlides().length - 1;

        new QuestionContainerHandler().setProgress((100 / QuizLayout.data.questions.length) * nextSlideNumber)

        if(isPenultimateSlide) {
            new TestSummaryHandler().createSummary();
        }

        if(isOutOfRange) return;

        slider.move(slider.getActiveSlide(), nextSlideNumber);
    }
}