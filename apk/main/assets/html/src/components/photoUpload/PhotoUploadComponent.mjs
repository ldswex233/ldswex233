import {PhotoUploadHandler} from "./PhotoUploadHandler.mjs";

const Handler = new PhotoUploadHandler();

export const PhotoUploadComponent = createComponent(`
    <div class="photo-upload"
        ${onLoad((e) => Handler.sendRequest())}
    >
        <div class="header">
            <div class="status">
                <div class="text">Trwa przetwarzanie zdjęcia...</div>
                <progress max="100" value="0"></progress>
            </div>
        </div>
        <div class="body">
            <div class="text">Wykryte słowa</div>
            <div class="list"></div>
            <button
                ${onClick((e) => Handler.createTest())}
            >Utwórz test</button>
        </div>
    </div>
`);

PhotoUploadComponent.importStyle('./src/components/photoUpload/PhotoUploadStyle.css');

