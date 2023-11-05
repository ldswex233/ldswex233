import {CalendarDayPopupWorkHandler} from "./CalendarDayPopupWorkHandler.mjs";

const Handler = new CalendarDayPopupWorkHandler();

export const CalendarDayPopupWorkPart = createPart(`
    <div class="element ${text(`type`)}"
        ${onHoldDown(async (e) => { await Handler.edit(e.data) })}
        ${onSlideLeft(async (e) => { Handler.hideDeleteButton(e.source) })}
        ${onSlideRight(async (e) => { Handler.showDeleteButton(e.source, e.data) })}
    >
        <div class="content">
            <div class="subject">${text("subject")}</div>
            <div class="details">
                <div class="description">${text("description")}</div>
            </div>
        </div>
    </div>
`);

CalendarDayPopupWorkPart.importStyle(`./src/parts/calendarDayPopupWork/CalendarDayPopupWorkStyle.css`);

/*
export const CalendarDayPopupWorkPart = createPart(`
    <div class="element">
        <div class="subject">${text("subject")}</div>
        <div class="details">
            <div class="description">${text("description")}</div>
            <div class="author">
                <i class="fa-solid fa-at"></i>
                ${text("authorUsername")}
            </div>
        </div>
        <div class="buttons">
            <button class="${text("quizBtnClass")}">Przejdź do quizu</button>
            <button
                ${onClick(async (event) => {
                    await Handler.edit(event.data);
                })}
             class="yellow">Edytuj</button>
            <button class="red"
                ${onClick(async (event) => {
                    await Handler.delete(event.part, event.data);
                }, { partReferred: true })}
            >Usuń</button>
        </div>
    </div>
`);
*/
