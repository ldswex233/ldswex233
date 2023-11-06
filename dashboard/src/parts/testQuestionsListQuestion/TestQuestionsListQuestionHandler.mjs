export class TestQuestionsListQuestionHandler {
    constructor() { }

    /**
     *
     * @param {HTMLElement} part
     * @param {Boolean} open
     */
    toggleTestTitleInput(part, open) {
        const title = part.querySelector(".title > .main");
        const input = title.querySelector("input");
        const showInput = input === null;

        if (!input && !open) return;

        title.innerHTML = (showInput
                ? `<input type="text" value="${title.innerHTML}">`
                : `${input.value}`
        );

        if(!showInput) {
            // TODO REQUEST WITH ACTUAL QUESTION TITLE
        }
    }

    delete(part, questionId) {
        const buttons = part.querySelector(".buttons");

        if(buttons.querySelector(".confirm")) return;

        const confirm = createElement(`<button class="confirm">Potwierdź</button>`).toElement();
        const cancel = createElement(`<button class="cancel">Anuluj</button>`).toElement();

        cancel.addEventListener('click', (e) => {
            confirm.remove();
            cancel.remove();
        });

        confirm.addEventListener('click', (e) => {
            // TODO REQUEST TO DELETE QUESTION
            part.remove();
        });

        buttons.insertAdjacentElement(`afterbegin`, cancel);
        buttons.insertAdjacentElement(`afterbegin`, confirm);
    }
}