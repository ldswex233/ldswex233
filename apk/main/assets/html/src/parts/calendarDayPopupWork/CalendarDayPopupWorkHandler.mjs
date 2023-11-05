import {NotificationError, NotificationSuccess} from "../../plugins/notification/notification.js";
import {MainLayout} from "../../layouts/main/MainLayout.mjs";
import {ContainerComponent} from "../../components/container/ContainerComponent.mjs";
import {WorkOverviewLayout} from "../../layouts/workOverview/WorkOverviewLayout.mjs";
import {Loader} from "../../components/loader/script/LoaderScript.mjs";
import {AppRequest} from "../../assets/mjs/AppRequest.mjs";
import {cache} from "../../assets/mjs/Cache.mjs";
import {Handler as CalendarHandler} from "../../components/calendar/CalendarComponent.mjs";

class CalendarDayPopupWorkHandler {
    constructor() {
    }

    /**
     *
     * @param {Object} data
     * @param {Date} data.calendarDate
     * @param {String} data.subject
     * @param {String} data.description
     * @param {String} data.workId
     * @param {String} data.type
     */
    async edit(data) {
        const loader = new Loader();

        await loader.enable();

        MainLayout
            .select(ContainerComponent)
            .loadLayout(
                WorkOverviewLayout.setData({
                    calendarDate: data.calendarDate,
                    subject: data.subject,
                    description: data.description,
                    type: data.type,
                    workId: data.workId
                })
            );

        await loader.disable();
    }

    /**
     *
     * @param {HTMLElement} partElement
     * @param {Object} data
     * @param {Date} data.calendarDate
     * @param {String} data.workId
     */
    async delete(partElement, data) {
        const isSuccess = await AppRequest.calendar.deleteWork(data.workId);

        if(!isSuccess) return new NotificationError(`Nie udało się usunąć pracy`)

        partElement.remove();

        new NotificationSuccess(`Usunięto pracę`);

        cache.setCalendarWorks(await AppRequest.calendar.getAllWorks());

        CalendarHandler.calendarCreator.setDate(new Date(data.calendarDate.getFullYear(), data.calendarDate.getMonth(), 1))
        CalendarHandler.renderCalendar();
    }

    showDeleteButton(source, data) {
        if(source.querySelector("button") !== null) return;

        const button = createElement(`<button><i class="tim-icons icon-trash-simple"></i></button>`).toElement();

        button.addEventListener('click', async (e) => {
            await this.delete(source, data)
        })

        source.insertAdjacentElement(`afterbegin`, button)
    }

    hideDeleteButton(source) {
        if(source.querySelector("button") === null) return;

        source.querySelector("button").remove();
    }
}

export {CalendarDayPopupWorkHandler}