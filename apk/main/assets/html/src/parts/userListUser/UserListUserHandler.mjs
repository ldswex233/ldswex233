import {NotificationInfo} from "../../plugins/notification/notification.js";

export class UserListUserHandler {
    constructor() { }

    /**
     *
     * @param {HTMLElement} source
     * @param data
     */
    sendBattleInvite(source, data) {
        source.classList.add("click");

        setTimeout(() => { source.classList.remove("click") }, 320);

        new NotificationInfo(`Ficzerek komink sun :)`)
    }
}