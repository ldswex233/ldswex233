import {Slider} from "../../components/slider/script/SliderScript.mjs";
import {NotificationError} from "../../plugins/notification/notification.js";
import {WorkOverviewLayout} from "../../layouts/workOverview/WorkOverviewLayout.mjs";
import {setProgressLevel} from "../../components/workOverview/script/WorkOverviewScript.mjs";

export class WorkSubjectHandler {
    constructor() {
    }

    /**
     *
     * @param {HTMLInputElement} input
     * @return {Promise<>}
     */
    async next(input) {
        const slider = new Slider();
        const value = input.value.trim();

        if(value === "") {
            return new NotificationError(`Wybierz nazwę pracy`)
        }

        WorkOverviewLayout.data.subject = value;

        setProgressLevel(1);

        await slider.move(0, 1);
    }
}