import {UserListUserPart} from "../../parts/userListUser/UserListUserPart.mjs";
import {AppRequest} from "../../assets/mjs/AppRequest.mjs";
import {MainLayout} from "../../layouts/main/MainLayout.mjs";
import {ContainerComponent} from "../container/ContainerComponent.mjs";
import {DrawboardLayout} from "../../layouts/drawboard/DrawboardLayout.mjs";
import {NotificationError} from "../../plugins/notification/notification.js";

export class UserHandler {
    constructor() {
        this.headerSubReference = null;
        this.progressSectionReference = null;
        this.testsReference = null;
        this.questionsReference = null;
        this.writesReference = null;
        this.drawboardPopupReference = null;
    }

    /**
     *
     * @param {Reference} headerSubReference
     * @param {Reference} progressSectionReference
     * @param {Reference} testsReference
     * @param {Reference} questionsReference
     * @param {Reference} writesReference
     * @param {Reference} drawboardPopupReference
     */
    setReferences(headerSubReference, progressSectionReference, testsReference, questionsReference, writesReference, drawboardPopupReference) {
        this.headerSubReference = headerSubReference;
        this.progressSectionReference = progressSectionReference;
        this.testsReference = testsReference;
        this.questionsReference = questionsReference;
        this.writesReference = writesReference;
        this.drawboardPopupReference = drawboardPopupReference;
    }

    async loadUsersList(source) {
        const users = await AppRequest.user.getUsersPublicData();

        source.innerHTML = ``;

        users.forEach(user => {
            source.insertAdjacentElement(`beforeend`, UserListUserPart.setData({ user: user }).toElement())
        })
    }

    async setStatistics() {
        const data = await AppRequest.user.getStatistics();

        if(data === null) return;

        this.testsReference.getElement().innerHTML = `${data.tests}`;
        this.questionsReference.getElement().innerHTML = `${data.questions}`;
        this.writesReference.getElement().innerHTML = `${data.writes}`;
    }

    async setProgressData() {
        const data = await AppRequest.user.getExperienceData();

        if(data === null) return;

        const source = this.progressSectionReference.getElement();
        const title = source.querySelector(".title");
        const progress = source.querySelector("progress");
        const subLeft = source.querySelector(".sub.left");
        const subRight = source.querySelector(".sub.right");

        title.innerHTML = data.rank.actual;
        progress.max = data.toNextRank;
        progress.value = data.progressedExperience;

        this.headerSubReference.getElement().innerHTML = `${data.experience} XP`;

        subLeft.querySelectorAll("span")[0].innerHTML = `${data.progressedExperience}`;
        subLeft.querySelectorAll("span")[1].innerHTML = `${data.toNextRank}`;

        subRight.querySelector("span").innerHTML = `${data.rank.next}`;
    }

    closeDrawboardPinPopup() {
        this.drawboardPopupReference.getElement().style.display = 'none';
    }

    async openDrawboardPinPopup() {
        await sleep(10);

        this.drawboardPopupReference.getElement().style.display = 'flex';
    }

    async connectToDrawboard() {
        const input = this.drawboardPopupReference.getElement().querySelector("input");

        if(input.value.trim() === "") return new NotificationError(`Błąd`)

        const res = await AppRequest.drawboard.listen(input.value);

        if(res === null) return;

        MainLayout.select(ContainerComponent).loadLayout(DrawboardLayout.setData({ connectionKey: input.value }));
    }
}