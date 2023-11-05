import {ApiUrl} from "../AppRoot.mjs";

export class SubjectRequests {
    constructor() {

    }

    /**
     *
     * @returns {Promise<{}>}
     */
    async getAll() {
        return (await new CjsRequest(`${ApiUrl}/subject/get`, "get")
            .setHeaders({ "Authorization": `Bearer ${localStorage.getItem("token")}` })
            .doRequest()).json().subjects;
    }

    /**
     *
     * @param {Number} id
     * @returns {Promise<{id: number, name: string, tests: Array<{id: number, subjectId: number, name: string, permissionLevel: number, doneByUser: boolean}>}>}
     */
    async getSubject(id) {
        return (await new CjsRequest(`${ApiUrl}/subject/get`, "get")
            .setQuery({ subjectId: id })
            .doRequest()).json().subject;

    }
}