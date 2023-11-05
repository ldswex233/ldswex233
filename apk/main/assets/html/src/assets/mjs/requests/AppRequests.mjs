import {ApiUrl} from "../AppRoot.mjs";

export class AppRequests {
    constructor() {
    }

    async checkVersion() {
        const request = await new CjsRequest(`${ApiUrl}/app/checkVersion`, "get")
            .doRequest();

        const json = request.json();

        if(request.isError()) {
            return;
        }

        return json.version;
    }
}