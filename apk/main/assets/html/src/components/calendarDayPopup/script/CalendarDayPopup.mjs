import {CalendarDayPopupComponent} from "../CalendarDayPopupComponent.mjs";
import {CalendarDayPopupWorkPart} from "../../../parts/calendarDayPopupWork/CalendarDayPopupWorkPart.mjs";
import {CalendarDayPart} from "../../../parts/calendarDay/CalendarDayPart.mjs";

class CalendarDayPopup {
    constructor() {
    }

    instantClose() {
        const element = CalendarDayPopupComponent.toElement();

        element.style.display = 'none';
    }

    /**
     *
     * @param {Date} date
     * @param {Array<Object>} works
     */
    async open(date, works) {
        CalendarDayPart.setEventLocked("click", true);

        await sleep(30); // delay because of outerclick

        const weekDays = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];
        const months = ['Stycznia', 'Lutego', 'Marca', 'Kwietnia', 'Maja', 'Czerwca', 'Lipca', 'Sierpnia', 'Września', 'Października', 'Listopada', 'Grudnia'];

        const element = CalendarDayPopupComponent.toElement();

        element.style.display = 'block';

        element.classList.remove("close");
        element.classList.add("open");

        const header = element.querySelector(".header");
        const dayName = header.querySelector(".day > .name");
        const dayDetails = header.querySelector(".day > .details");

        dayName.innerHTML = `${weekDays[(date.getDay() === 0 ? 6 : date.getDay() - 1)]}`;
        dayDetails.innerHTML = `${date.getDate()} ${months[date.getMonth()]}`

        const body = element.querySelector(".body")
        const list = body.querySelector(".list");

        list.innerHTML = ``;

        works.forEach(work => {
            list.insertAdjacentElement(`beforeend`,
                CalendarDayPopupWorkPart
                    .setData({
                        calendarDate: date,
                        subject: work.subject,
                        description: work.description,
                        type: work.type,
                        authorUsername: work.author.username,
                        workId: work.id,
                        quizBtnClass: (work.quizId !== 0 ? '' : 'display-none')
                    })
                    .toElement()
            )
        });
    }

    async close() {
        const element = CalendarDayPopupComponent.toElement();

        element.classList.remove("open");
        element.classList.add("close");

        await sleep(300);

        element.style.display = 'none';

        CalendarDayPart.setEventLocked("click", false);
    }
}

export {CalendarDayPopup}