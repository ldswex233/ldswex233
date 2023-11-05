import {CalendarDayPopupHandler} from "./CalendarDayPopupHandler.mjs";

const Handler = new CalendarDayPopupHandler();

export const CalendarDayPopupComponent = createComponent(`
    <div class="popup open" style="display: block">
        <div class="header"
            ${onSlideDown(async () => { await Handler.outerClickClosePopup(); })}
        >
            <div class="trigger">
                <div class="area"></div>
                <div class="display"></div>
            </div>
            <div class="day">
                <span class="name">Nie zdefiniowano</span>
                <span class="details">0 nie zdefiniowano</span>
            </div>
        </div>
        <div class="body">
            <div class="list">
                
            </div>
            <button ripple
                ${onClick(async () => { await Handler.addWork(); })}
            >
                <img src="${asset(`svg/plus.svg`)}" alt="">
            </button>
        </div>
    </div>
`);

CalendarDayPopupComponent.importStyle('./src/components/calendarDayPopup/CalendarDayPopupStyle.css');

