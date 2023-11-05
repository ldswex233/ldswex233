import {Slider} from "../../components/slider/script/SliderScript.mjs";
import {NotificationError} from "../../plugins/notification/notification.js";
import {WorkOverviewLayout} from "../../layouts/workOverview/WorkOverviewLayout.mjs";
import {WorkConfirmPart} from "../workConfirm/WorkConfirmPart.mjs";
import {setProgressLevel} from "../../components/workOverview/script/WorkOverviewScript.mjs";

export class WorkDescriptionHandler {
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
            return new NotificationError(`Wybierz opis pracy`)
        }

        WorkOverviewLayout.data.description = value;

        slider.addSlide(
            WorkConfirmPart
                .setData({
                    subject: WorkOverviewLayout.data.subject,
                    description: WorkOverviewLayout.data.description,
                    type: WorkOverviewLayout.data.type,
                })
                .toElement()
        );

        setProgressLevel(2);

        await slider.move(1, 2);
    }
}