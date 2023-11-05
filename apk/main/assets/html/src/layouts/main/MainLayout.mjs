import {LoaderComponent} from "../../components/loader/LoaderComponent.mjs";
import {ContainerComponent} from "../../components/container/ContainerComponent.mjs";
import {LoginLayout} from "../login/LoginLayout.mjs";
import {PanelLayout} from "../panel/PanelLayout.mjs";
import {PhotoUploadLayout} from "../photoUpload/PhotoUploadLayout.mjs";
import {QuizLayout} from "../quiz/QuizLayout.mjs";

export const MainLayout = new LayoutLoader(createLayout(
    [
        [LoaderComponent],
        [ContainerComponent]
    ]
));

MainLayout.onLoad(async () => {
    MainLayout
        .select(ContainerComponent)
        .loadLayout(LoginLayout);
});