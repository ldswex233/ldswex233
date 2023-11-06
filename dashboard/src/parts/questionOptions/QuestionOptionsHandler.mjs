import {NotificationError, NotificationSuccess} from "../../plugins/notification/notification.js";
import {SelectorPart} from "../selector/SelectorPart.mjs";
import {AppRequest} from "../../assets/mjs/AppRequest.mjs";
import {QuestionCreatorLayout} from "../../layouts/questionCreator/QuestionCreatorLayout.mjs";
import {MainLayout} from "../../layouts/main/MainLayout.mjs";
import {ContainerComponent} from "../../components/container/ContainerComponent.mjs";
import {TestQuestionsOverviewLayout} from "../../layouts/testQuestionsOverview/TestQuestionsOverviewLayout.mjs";
import {ContentComponent} from "../../components/content/ContentComponent.mjs";

export class QuestionOptionsHandler {

    constructor() {
        this.reloadData();
    }

    reloadData() {
        this.elements = {
            optionsList: null,
            optionsSelectorContainer: null,
            correctOptionsContainer: null
        }

        this.question = null;
        this.options = {};
        this.correctOptionsIds = [];
        this.settings = {
            allowRandom: true
        }
    }

    /**
     *
     * @param {HTMLElement} optionsList
     * @param {HTMLElement} optionsSelectorContainer
     * @param {HTMLElement} correctOptionsContainer
     */
    setElements(optionsList, optionsSelectorContainer, correctOptionsContainer) {
        this.elements = {
            optionsList: optionsList,
            optionsSelectorContainer: optionsSelectorContainer,
            correctOptionsContainer: correctOptionsContainer
        }
    }

    /**
     *
     * @param {Boolean} isRandomAllowed
     */
    setRandomAllowed(isRandomAllowed) {
        this.settings.allowRandom = isRandomAllowed;
    }

    /**
     *
     * @param {String} question
     */
    setQuestion(question) {
        this.question = question;
    }

    updateOptionsSelector() {
        const options = Object.keys(this.options).map(id => {
            const name = this.options[id];
            const isNameEmpty = name === null || name === '';

            return {
                id: id,
                name: (isNameEmpty ? 'Brak treści' : name),
                onClick: () => {
                    if(isNameEmpty) return new NotificationError(`Brak treści w opcji`)

                    this.addCorrectOptionId(id)
                }
            };
        })

        this.elements.optionsSelectorContainer.innerHTML = SelectorPart
            .setData({ options: options })
            .toHtml()
    }

    updateCorrectOptionsContainer() {
        this.elements.correctOptionsContainer.innerHTML = ``;

        this.correctOptionsIds.forEach(correctOptionId => {
            const name = this.options[correctOptionId];
            const option = createElement(`<div class="option" title="Kliknij by usunąć poprawną opcję">${name}</div>`).toElement();

            option.addEventListener('click', (e) => {
                this.correctOptionsIds = this.correctOptionsIds.filter(e => e !== correctOptionId);

                this.updateCorrectOptionsContainer();
            })

            this.elements.correctOptionsContainer.insertAdjacentElement(`beforeend`, option);
        });
    }

    addOption() {
        const list = this.elements.optionsList;
        const element = createElement(`
            <div class="element">
                <input type="text" placeholder="Tu wpisz treść opcji"> <button>-</button>
            </div>
        `).toElement();

        const input = element.querySelector("input");
        const button = element.querySelector("button");
        const optionId = getRandomCharacters(16);

        input.addEventListener('input', () => {
             this.options[optionId] = input.value;

             this.updateOptionsSelector();
        });

        button.addEventListener('click', () => {
            if(Object.keys(this.options).length <= 2) {
                return new NotificationError(`Pytanie musi zawierać 2 opcje`)
            }

            delete this.options[optionId];
            this.correctOptionsIds = this.correctOptionsIds.filter(e => e !== optionId);

            element.remove();

            this.updateCorrectOptionsContainer();
            this.updateOptionsSelector();
        })

        list.insertAdjacentElement(`beforeend`, element);

        this.options[optionId] = null;
        this.updateOptionsSelector();
    }

    addCorrectOptionId(optionId) {
        this.correctOptionsIds.push(optionId);
        this.correctOptionsIds = [...new Set(this.correctOptionsIds)];

        this.updateCorrectOptionsContainer();
    }

    /**
     *
     * @param {String} questionId if not null it will overwrite existing question with that id
     */
    async saveQuestion(questionId = null) {
        const createQuestion = questionId === null;

        if(createQuestion) {
            const json = await AppRequest.question.createQuestionOptions(
                QuestionCreatorLayout.data.testId,
                {
                    question: this.question,
                    options: Object.values(this.options),
                    correct: this.correctOptionsIds.map(e => Object.keys(this.options).indexOf(e) + 1),
                    allowRandom: this.settings.allowRandom
                }
            );

            if(json.message) {
                return new NotificationError(json.message);
            }

            new NotificationSuccess(`Dodano pytanie`)
            return MainLayout
                .select(ContentComponent)
                .loadLayout(TestQuestionsOverviewLayout.setData({ testId: QuestionCreatorLayout.data.testId }))
        }

        // edit question
    }
}