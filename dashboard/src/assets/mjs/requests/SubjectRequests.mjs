import {ApiUrl} from "../AppRoot.mjs";

export class SubjectRequests {
    constructor() {

    }

    async getAll() {
        return (await new CjsRequest(`${ApiUrl}/subject/get`, "get").doRequest()).json();
    }
}