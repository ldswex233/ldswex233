import {ApiUrl} from "../AppRoot.mjs";
import {NotificationError} from "../../../plugins/notification/notification.js";
import {PhotoUploadLayout} from "../../../layouts/photoUpload/PhotoUploadLayout.mjs";

export class RecognitionRequests {
    constructor() {
    }

    async recognizeImageText(image) {
        const request = await new CjsRequest(`${ApiUrl}/recognition/recognizeImageText`, "post")
            .setHeaders({ "Authorization": `Bearer ${localStorage.getItem("token")}` })
            .setFiles({ image: image })
            .doRequest();

        const json = request.json();

        if(request.isError()) {
            new NotificationError(`Błąd wysyłania zdjęcia na serwer`);

            return '';
        }

        return json;
    }

    async apiNinjasRecognizeImageText(image) {
        const request = await new CjsRequest(`https://api.api-ninjas.com/v1/imagetotext`, "post")
            .setFiles({image: image})
            .setHeaders({ "X-Api-Key": "FChYCeQGIGWv6oeNQ4jQxA==Qz2P32VsdytTRZyd" }) // api key
            .doRequest()

        const json = request.json();

        if(request.isError()) {
            new NotificationError(`Błąd wysyłania zdjęcia na serwer (api-ninjas)`);

            return '';
        }

        let text = '';

        json.forEach(element => { text += element.text; })

        return text;
    }
}