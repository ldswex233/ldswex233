import {NotificationError} from "../../../plugins/notification/notification.js";
import {ApiUrl} from "../AppRoot.mjs";

export class UserRequests {
    constructor() {
    }

    async validateToken() {
        const request = await new CjsRequest(`${ApiUrl}/user/authorize`, "post")
            .setHeaders({ "Authorization": `Bearer ${localStorage.getItem("token")}` })
            .doRequest();

        return (!request.isError());
    }

    async authorize(username, pin) {
        const request = await new CjsRequest(`${ApiUrl}/user/login`, "post")
            .setBody({ username: username, pin: pin })
            .doRequest();

        const json = request.json();

        if(request.isError()) {
            new NotificationError(json.message);

            return false;
        }

        const token = json.token;

        localStorage.setItem("username", username);
        localStorage.setItem("token", token);

        return true;
    }

    /**
     *
     * @returns {Promise<Array<{ id: number, username: string, lastLoginTimestamp: number }>>}
     */
    async getUsersPublicData() {
        const request = await new CjsRequest(`${ApiUrl}/user/getUsersPublicData`, "get")
            .setHeaders({ "Authorization": `Bearer ${localStorage.getItem("token")}` })
            .doRequest()

        if(request.isError()) {
            new NotificationError(`Błąd pobierania użytkowników`)
            return [];
        }

        const json = request.json();

        return json.users;
    }

    /**
     *
     * @returns {Promise<{experience: number, progressedExperience: number, nextRankTotalExperience: number, toNextRank: number, rank: { actual: string, next: string, previous: string }}|null>}
     */
    async getExperienceData() {
        const request = await new CjsRequest(`${ApiUrl}/user/getExperienceData`, "get")
            .setHeaders({ "Authorization": `Bearer ${localStorage.getItem("token")}` })
            .doRequest()

        if(request.isError()) {
            new NotificationError(`Błąd pobierania informacji o doświadczeniu`)
            return null;
        }

        const json = request.json();

        return json;
    }

    /**
     *
     * @returns {Promise<{userId: number, tests: number, questions: number, writes: number}|null>}
     */
    async getStatistics() {
        const request = await new CjsRequest(`${ApiUrl}/user/getStatistics`, "get")
            .setHeaders({ "Authorization": `Bearer ${localStorage.getItem("token")}` })
            .doRequest()

        if(request.isError()) {
            new NotificationError(`Błąd pobierania informacji o statystykach`)
            return null;
        }

        const json = request.json();

        return json;
    }
}