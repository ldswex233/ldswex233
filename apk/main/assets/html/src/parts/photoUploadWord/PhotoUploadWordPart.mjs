import {PhotoUploadWordHandler} from "./PhotoUploadWordHandler.mjs";

const Handler = new PhotoUploadWordHandler();

export const PhotoUploadWordPart = createPart(`
    <div class="element">
        <input type="text" value="${text(`first`)}">
        <i class="fa-solid fa-arrow-right"></i>
        <input type="text" value="${text(`second`)}">
    </div>
`);

PhotoUploadWordPart.importStyle('./src/parts/photoUploadWord/PhotoUploadWordStyle.css');