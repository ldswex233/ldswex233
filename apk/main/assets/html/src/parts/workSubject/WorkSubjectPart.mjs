import {WorkSubjectHandler} from "./WorkSubjectHandler.mjs";

const Handler = new WorkSubjectHandler();

const inputReference = new Reference();

export const WorkSubjectPart = createPart(`
    <div class="body">
        <div class="form">
            <div>Nazwa przedmiotu:</div>
            <input type="text" placeholder="Nazwa przedmiotu" value="${text("subject")}" ${inputReference}>
        </div>
        <button ripple
            ${onClick(async () => { await Handler.next(inputReference.getElement()) })}
        >Dalej</button>
    </div>
`);
