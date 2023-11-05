import {cache} from "../../../assets/mjs/Cache.mjs";
import {CalendarDayPart} from "../../../parts/calendarDay/CalendarDayPart.mjs";

Date.prototype.getMonthDays = function() {
    return new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate();
};

const CalendarTranslates = {
    WeekDays: ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Niedz'],
    Months: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień']
}

export class CalendarCreator {
    constructor() {
        const todayDate = new Date();

        this.renderedDate = new Date(todayDate.getFullYear(), todayDate.getMonth());
        this.endSkippedWeekDays = 0;
    }

    /**
     *
     * @param {Number} endSkippedWeekDays number of skipped days of week count from end so 2 means there will be no saturday and sunday
     * @returns {CalendarCreator}
     */
    setEndSkippedWeekDays(endSkippedWeekDays) {
        this.endSkippedWeekDays = endSkippedWeekDays;

        return this;
    }

    /**
     *
     * @param {Date} date
     * @returns {CalendarCreator}
     */
    setDate(date) {
        this.renderedDate = new Date(date.getFullYear(), date.getMonth());

        return this;
    }

    /**
     * Setts next / previous month date
     * @param {Boolean} isPrevious
     * @returns {CalendarCreator}
     */
    setSubsequentDate(isPrevious) {
        const isBorderMonth = this.renderedDate.getMonth() === (isPrevious ? 0 : 11);
        const year = this.renderedDate.getFullYear() + (isBorderMonth ? (isPrevious ? -1 : 1) : 0);
        const month = (isBorderMonth ? (isPrevious ? 11 : 0) : this.renderedDate.getMonth() + (isPrevious ? -1 : 1))

        this.renderedDate = new Date(year, month);

        return this;
    }

    /**
     *
     * @returns {String} month name
     */
    getTranslatedMonth() {
        return CalendarTranslates.Months[this.renderedDate.getMonth()];
    }

    /**
     *
     * @returns {Array<{date: Date, dayNumber: Number, isOutOfMonth: Boolean}>}
     */
    getCalendarData() {
        const calendar = [];
        const date = this.renderedDate;
        const start = new Date(date.getFullYear(), date.getMonth()).getDay() - 1;
        const monthDays = date.getMonthDays();
        const realWeekDay = (date.getDay() === 0 ? 7 : date.getDay());
        let realWeekDayCountdown = 1;
        let day = 1;
        let nextMonthDaysCount = 1;

        for (let i = 1; i <= 6; i++) {
            for (let j = 0; j < 7; j++) {
                let actualDate = new Date(date.getFullYear(), date.getMonth(), day);
                let visibleDay = day;
                let isOutOfMonth = false;

                if(day > monthDays) {
                    visibleDay = nextMonthDaysCount;
                    isOutOfMonth = true;
                    nextMonthDaysCount++;

                    actualDate = new Date(date.getFullYear(), date.getMonth(), visibleDay).addMonths(1);
                }

                if(realWeekDay > realWeekDayCountdown) {
                    const previousMonthDay = new Date(date.getFullYear(), date.getMonth(), 1);

                    previousMonthDay.setDate(previousMonthDay.getDate() - (realWeekDay - realWeekDayCountdown));

                    visibleDay = previousMonthDay.getDate();
                    isOutOfMonth = true;

                    actualDate = previousMonthDay;

                    realWeekDayCountdown++;
                }

                if ((i === 1 && j < start) && false) {
                    const previousMonthDay = new Date(date.getFullYear(), date.getMonth(), 1);

                    previousMonthDay.setDate(previousMonthDay.getDate() - (start - j));

                    visibleDay = previousMonthDay.getDate();
                    isOutOfMonth = true;

                    actualDate = previousMonthDay;
                }

                calendar.push({
                    date: actualDate,
                    dayNumber: visibleDay,
                    isOutOfMonth: isOutOfMonth
                })

                if(!isOutOfMonth) {
                    day++;
                }
            }
        }

        return calendar;
    }

    /**
     *
     * @returns {HTMLElement}
     */
    getTableElement() {
        const table = new HtmlElement(`<table></table>`);
        const calendarData = this.getCalendarData();
        const todayDate = new Date();
        const tr = createElement(`<tr></tr>`);
        const weekDaysLength = CalendarTranslates.WeekDays.length;

        CalendarTranslates.WeekDays.forEach((weekDay, index) => {
            if(this.endSkippedWeekDays > weekDaysLength - (index + 1)) return;

            tr.appendAfter(`<th>${weekDay}</th>`);
        })

        table.appendAfter(tr.toHtml());
        tr.clearContent();

        calendarData
            .filter((_, index) => (index % weekDaysLength) < (weekDaysLength - this.endSkippedWeekDays))
            .forEach((data, index) => {
                const { date, dayNumber, isOutOfMonth } = data;
                const fieldsInRow = 7 - this.endSkippedWeekDays;
                const isNextRow = ((index + 1) % (fieldsInRow) === 0) && index !== 0;
                const worksInDay = cache.getCalendarWorksInDay(date.getFullYear(), date.getMonth() + 1, date.getDate())
                const classes = [];
                const isToday = (
                    date.getFullYear() === todayDate.getFullYear()
                    && date.getMonth() === todayDate.getMonth()
                    && date.getDate() === todayDate.getDate()
                );

                if(isToday) { classes.push('today') }

                if(isOutOfMonth && !classes.includes("today")) {
                    classes.push('gay-out')
                }

                tr.appendAfter(
                    CalendarDayPart
                        .setData({
                            date: date,
                            day: dayNumber,
                            class: classes.join(" "),
                            types: {
                                info: worksInDay.filter(e => e.type === "info").length,
                                homework: worksInDay.filter(e => e.type === "homework").length,
                                partial: worksInDay.filter(e => e.type === "partial").length,
                                test: worksInDay.filter(e => e.type === "test").length,
                            }
                        })
                        .toHtml()
                )

                if(isNextRow) {
                    table.appendAfter(tr.toHtml());
                    tr.clearContent();
                }
        });

        return table.toElement();
    }
}