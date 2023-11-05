import {CalendarDayPopupComponent} from "./CalendarDayPopupComponent.mjs";
import {CalendarDayPopup} from "./script/CalendarDayPopup.mjs";
import {MainLayout} from "../../layouts/main/MainLayout.mjs";
import {ContainerComponent} from "../container/ContainerComponent.mjs";
import {WorkOverviewLayout} from "../../layouts/workOverview/WorkOverviewLayout.mjs";
import {PanelLayout} from "../../layouts/panel/PanelLayout.mjs";
import {Loader} from "../loader/script/LoaderScript.mjs";

class CalendarDayPopupHandler {
    constructor() {
    }

    async outerClickClosePopup() {
        if(CalendarDayPopupComponent.toElement().style.display === 'none') return;

        await new CalendarDayPopup().close();
    }

    async addWork() {
        const loader = new Loader();

        await loader.enable(100);

        MainLayout
            .select(ContainerComponent)
            .loadLayout(
                WorkOverviewLayout
                    .setData({
                        subject: "",
                        description: "",
                        calendarDate: PanelLayout.data.selectedDayDate
                    })
            );

        await loader.disable();
    }
}

export {CalendarDayPopupHandler}