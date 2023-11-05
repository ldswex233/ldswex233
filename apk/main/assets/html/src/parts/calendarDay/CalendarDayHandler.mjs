import {PanelLayout} from "../../layouts/panel/PanelLayout.mjs";
import {CalendarDayPopup} from "../../components/calendarDayPopup/script/CalendarDayPopup.mjs";
import {AppRequest} from "../../assets/mjs/AppRequest.mjs";

export class CalendarDayHandler {
    constructor() {
    }

    /**
     *
     * @param {Object} data
     * @param {Date} data.date
     * @return {Promise<void>}
     */
    async openWorks(data) {
        const { date } = data;

        PanelLayout.data.selectedDayDate = date;

        const works = await AppRequest.calendar.getWorks(date.getFullYear(), date.getMonth() + 1, date.getDate());

        await new CalendarDayPopup().open(date, works);
    }

    /**
     *
     * @param {HTMLElement} element
     * @param {{info: number, homework: number, partial: number, test: number}} types
     */
    createPreview(element, types) {
        for(const [key, value] of Object.entries(types)) {
            if(value === 0) continue;

            element.insertAdjacentHTML(`beforeend`, `
                <div class="${key}s">${"<e></e>".repeat(value)}</div>
            `)
        }
    }
}