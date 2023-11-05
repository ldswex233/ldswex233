import {UpdateLayout} from "../../layouts/update/UpdateLayout.mjs";

export class UpdateHandler {
    constructor() { }

    download() {
        window.location.href = UpdateLayout.data.downloadUrl;
    }
}