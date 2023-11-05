import {Slider} from "../slider/script/SliderScript.mjs";
import {setProgressLevel} from "./script/WorkOverviewScript.mjs";
import {PanelLayout} from "../../layouts/panel/PanelLayout.mjs";
import {WorkOverviewLayout} from "../../layouts/workOverview/WorkOverviewLayout.mjs";
import {MainLayout} from "../../layouts/main/MainLayout.mjs";
import {ContainerComponent} from "../container/ContainerComponent.mjs";
import {Loader} from "../loader/script/LoaderScript.mjs";

export class WorkOverviewHandler {
    constructor() {
    }

    async back() {
        const slider = new Slider();

        if(slider.getActiveSlide() === 0) {
            return await this.exit();
        }

        setProgressLevel(slider.getActiveSlide() - 1);

        await slider.move(slider.getActiveSlide(), slider.getActiveSlide() - 1);

        if(slider.getActiveSlide() === 1) {
            slider.removeLastSlide();
        }
    }

    async exit() {
        const loader = new Loader();

        await loader.enable(400);

        MainLayout
            .select(ContainerComponent)
            .loadLayout(
                PanelLayout.setData({
                    calendarDate: WorkOverviewLayout.data.calendarDate
                })
            );

        await loader.disable();
    }
}