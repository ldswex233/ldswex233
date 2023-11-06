import {SelectorPart} from "../../parts/selector/SelectorPart.mjs";

export class QuestionTypeSelectorHandler {
    constructor() { }

    /**
     *
     * @param {HTMLElement} source
     */
    loadQuestionTypeSelector(source) {
        const selector = SelectorPart
            .setData({
                options: [
                    {
                        id: 1,
                        name: "Pytanie zamknięte",
                        onClick: () => {  }
                    }
                ]
            })
            .toElement();

        source.appendChild(selector);
    }
}