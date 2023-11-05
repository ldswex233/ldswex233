import {CalendarDayHandler} from "./CalendarDayHandler.mjs";

const Handler = new CalendarDayHandler();

export const CalendarDayPart = createPart(`
    <td
        class="${text("class")}" ripple
        ${onClick(async (event) => { await Handler.openWorks(event.data); })}
    >
        <div class="content">
            <div class="day">
                <div class="text">${text("day")}</div>
            </div>
            <div class="assignments"
                ${onLoad((e) => { Handler.createPreview(e.source, e.data.types) })}
            >
               
            </div>
        </div>
    </td>
`);

CalendarDayPart.importStyle(`./src/parts/calendarDay/CalendarDayStyle.css`)