import {ApiUrl} from "../AppRoot.mjs";
import {NotificationError} from "../../../plugins/notification/notification.js";

export class DrawboardRequests {
    constructor() {
    }

    /**
     *
     * @param {Number|String} key
     * @returns {Promise<null|{}>}
     */
    async listen(key) {
        const request = await new CjsRequest(`${ApiUrl}/drawboard/listen`, "post")
            .setBody({key: key})
            .setHeaders({ "Authorization": `Bearer ${localStorage.getItem("token")}` })
            .doRequest();

        if(request.isError()) {
            new NotificationError(`Błąd połączenia`)
            return null;
        }

        return request.json().drawboard;
    }
}