import {WorkConfirmHandler} from "./WorkConfirmHandler.mjs";

const Handler = new WorkConfirmHandler();

export const WorkConfirmPart = createPart(`
    <div class="body">
        <div class="form"
            ${onLoad((e) => { Handler.detectWorkType(e.source, e.data.type) })}
        >
            <div>Nazwa przedmiotu</div>
            <input type="text" value="${text("subject")}" disabled>
            <br>
            <div>Opis</div>
            <input type="text" value="${text("description")}" disabled>
            <br>
            <div>Rodzaj pracy</div>
            <div class="types"></div>
        </div>
        <button ripple
            ${onClick(async () => { await Handler.confirm(); })}
        >Potwierdź</button>
    </div>
`);

WorkConfirmPart.importStyle(`./src/parts/workConfirm/WorkConfirmStyle.css`);