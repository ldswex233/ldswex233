import {WorkDescriptionHandler} from "./WorkDescriptionHandler.mjs";

const Handler = new WorkDescriptionHandler();

const inputReference = new Reference();

export const WorkDescriptionPart = createPart(`
    <div class="body">
        <div class="form">
            <div>Opis pracy:</div>
            <input type="text" placeholder="Opis pracy" value="${text("description")}" ${inputReference}>
        </div>
        <button ripple
            ${onClick(async () => { await Handler.next(inputReference.getElement()) })}
        >Dalej</button>
    </div>
`);
