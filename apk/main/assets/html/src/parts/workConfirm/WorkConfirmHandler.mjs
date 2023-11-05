import {WorkOverviewLayout} from "../../layouts/workOverview/WorkOverviewLayout.mjs";
import {MainLayout} from "../../layouts/main/MainLayout.mjs";
import {ContainerComponent} from "../../components/container/ContainerComponent.mjs";
import {PanelLayout} from "../../layouts/panel/PanelLayout.mjs";
import {Loader} from "../../components/loader/script/LoaderScript.mjs";
import {AppRequest} from "../../assets/mjs/AppRequest.mjs";

export class WorkConfirmHandler {
    constructor() {
        this.workType = null;
    }

    detectWorkType(source, workType = null) {
        const description =  source.querySelectorAll("input")[1].value;

        // some type detection logic

        this.workType = (workType === null ? 'homework' : workType);

        const types = source.querySelector(".types");

        [
            { t: "info", n: "Informacyjna" },
            { t: "homework", n: "Praca domowa" },
            { t: "partial", n: "Kartkówka" },
            { t: "test", n: "Sprawdzian" }
        ].forEach(type => {
            const element = createElement(`<div ripple class="${type.t} ${(type.t === this.workType ? `active` : ``)}">${type.n}</div>`).toElement();

            element.addEventListener('click', (e) => {
                this.workType = type.t;

                Array.from(source.querySelectorAll(".types > *")).forEach(typeElement => {
                    typeElement.classList.remove("active");
                });

                element.classList.add("active");
            })

            types.insertAdjacentElement(`beforeend`, element);
        })
    }

    async confirm() {
        const loader = new Loader();
        const isEditAction = "workId" in WorkOverviewLayout.data && WorkOverviewLayout.data.workId !== null;
        const { subject, description, calendarDate } = WorkOverviewLayout.data;

        await loader.enable(200);

        let isSuccess = (
            isEditAction ?
                await AppRequest.calendar.editWork(
                    WorkOverviewLayout.data.workId,
                    subject,
                    description,
                    this.workType
                ) :
                await AppRequest.calendar.createWork(
                    calendarDate.getFullYear(),
                    calendarDate.getMonth() + 1,
                    calendarDate.getDate(),
                    subject,
                    description,
                    this.workType
                )
        );

        await loader.disable();

        if(!isSuccess) return;

        WorkOverviewLayout.resetToDefaultData();

        MainLayout
            .select(ContainerComponent)
            .loadLayout(
                PanelLayout.setData({
                    calendarDate: WorkOverviewLayout.data.calendarDate
                })
            );
    }
}