import {CalendarHandler} from "./CalendarHandler.mjs";
import {cache} from "../../assets/mjs/Cache.mjs";
import {AppRequest} from "../../assets/mjs/AppRequest.mjs";

export const Handler = new CalendarHandler();

export const CalendarComponent = createComponent(`
    <div class="calendar">
        <div class="header">
            <button ripple
                ${onClick(() => { Handler.previous() })}
            >
                <img src="${asset(`svg/arrow-left.svg`)}" alt="">
            </button>
            <div class="month">
                <div class="text"></div>
            </div>
            <button ripple
                ${onClick(() => { Handler.next(); })}
            >
                <img src="${asset(`svg/arrow-right.svg`)}" alt="">
            </button>
        </div>
        <div class="table">
            <table></table>
        </div>
        <div class="info">
            <div class="content"
                ${onLoad(async (e) => { await Handler.loadNextSchoolDayWorksPreview(e.source) })}
            >
                <div class="title">
                    <span class="big">Jutro</span>
                    <span class="small">3 Października</span>
                </div>
                <div class="list"></div>
            </div>
        </div>
    </div>
`);

CalendarComponent.onLoad(async () => {
    cache.setCalendarWorks(await AppRequest.calendar.getAllWorks())

    Handler.renderCalendar();
})

CalendarComponent.importStyle('./src/components/calendar/CalendarStyle.css');


