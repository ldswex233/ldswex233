import {CalendarCreator} from "./script/CalendarCreator.mjs";
import {CalendarComponent} from "./CalendarComponent.mjs";
import {cache} from "../../assets/mjs/Cache.mjs";
import {AppRequest} from "../../assets/mjs/AppRequest.mjs";

export class CalendarHandler {
    constructor() {
        this.calendarCreator = new CalendarCreator()
            .setEndSkippedWeekDays(2);
    }

    renderCalendar() {
        const table = this.calendarCreator.getTableElement();
        const component = CalendarComponent.toElement();

        component
            .querySelector(".table > table")
            .replaceWith(table)

        component
            .querySelector(".header > .month > .text")
            .innerHTML = this.calendarCreator.getTranslatedMonth()
    }

    next() {
        this.calendarCreator.setSubsequentDate(false);

        this.renderCalendar()
    }

    previous() {
        this.calendarCreator.setSubsequentDate(true);

        this.renderCalendar();
    }

    /**
     *
     * @param {HTMLElement} element
     */
    async loadNextSchoolDayWorksPreview(element) {
        const SATURDAY = 6;
        const SUNDAY = 0;
        const WeekDaysTranslates = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];
        const MonthsTranslates = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia']

        const date = new Date();

        date.setDate(date.getDate() + 1);

        while([SUNDAY, SATURDAY].includes(date.getDay())) {
            date.setDate(date.getDate() + 1);
        }

        const isTomorrow = new Date().getDate() + 1 === date.getDate();
        const works = await AppRequest.calendar.getWorks(date.getFullYear(), date.getMonth() + 1, date.getDate())
        const title = element.querySelector(".title");
        const big = title.querySelector(".big");
        const small = title.querySelector(".small")
        const list = element.querySelector(".list");

        big.innerHTML = `${(isTomorrow ? 'Jutro' : WeekDaysTranslates[date.getDay()])}`;
        small.innerHTML = `${date.getDate()} ${MonthsTranslates[date.getMonth()]}`;

        works.forEach(work => {
            list.insertAdjacentHTML(`beforeend`, `
                <div class="${work.type}">${work.description}</div>
            `)
        })
    }
}