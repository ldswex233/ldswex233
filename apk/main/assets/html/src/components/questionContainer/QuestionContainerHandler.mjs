import {MainLayout} from "../../layouts/main/MainLayout.mjs";
import {ContainerComponent} from "../container/ContainerComponent.mjs";
import {PanelLayout} from "../../layouts/panel/PanelLayout.mjs";
import {QuestionContainerComponent} from "./QuestionContainerComponent.mjs";

export class QuestionContainerHandler {
    constructor() { }

    exit() {
        MainLayout
            .select(ContainerComponent)
            .loadLayout(PanelLayout.setData({ defaultSlide: 0 }))
    }

    /**
     *
     * @param {Number} percentage
     */
    setProgress(percentage) {
        const progress = QuestionContainerComponent.toElement().querySelector(".header > .progress > .element > .bar");

        progress.style.width = `${percentage}%`;
    }
}