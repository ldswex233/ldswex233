import {AppRequest} from "../../assets/mjs/AppRequest.mjs";
import {NotificationInfo, NotificationSuccess} from "../../plugins/notification/notification.js";

export class TestsListTestHandler {
    constructor() { }

    /**
     *
     * @param {HTMLElement} part
     * @param {{id: number, subjectId, name: string}} data
     * @param {Boolean} open
     */
    async toggleTestTitleInput(part, data, open) {
        const title = part.querySelector(".title > .main");
        const input = title.querySelector("input");
        const showInput = input === null;

        if (!input && !open) return;

        console.log('trigger', open)


        title.innerHTML = (showInput
            ? `<input type="text" value="${title.innerHTML}">`
            : `${input.value}`
        );

        if(!open) {
            const request = await AppRequest.test.edit(data.id, data.subjectId, input.value);

            new NotificationSuccess(`Nadano nazwę ${request.test.name}`);
        }
    }

    delete(part, testId) {
        const buttons = part.querySelector(".buttons");

        if(buttons.querySelector(".confirm")) return;

        const confirm = createElement(`<button class="confirm">Potwierdź</button>`).toElement();
        const cancel = createElement(`<button class="cancel">Anuluj</button>`).toElement();

        cancel.addEventListener('click', (e) => {
            confirm.remove();
            cancel.remove();
        });

        confirm.addEventListener('click', async (e) => {
            const request = await AppRequest.test.delete(testId);

            new NotificationSuccess(request.message);

            part.remove();
        });

        buttons.insertAdjacentElement(`afterbegin`, cancel);
        buttons.insertAdjacentElement(`afterbegin`, confirm);
    }
}