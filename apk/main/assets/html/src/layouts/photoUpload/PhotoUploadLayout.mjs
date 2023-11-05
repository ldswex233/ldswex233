import {PhotoUploadComponent} from "../../components/photoUpload/PhotoUploadComponent.mjs";

export const PhotoUploadLayout = new LayoutLoader(createLayout(
    [
        [PhotoUploadComponent]
    ]
));

PhotoUploadLayout.setDefaultData({
    image: null
})