import {UpdateHandler} from "./UpdateHandler.mjs";

const Handler = new UpdateHandler();

export const UpdateComponent = createComponent(`
    <div class="update">
        <div class="header">
            <div class="text">Nowa werjsa!</div>
        </div>
        <div class="body">
            <div class="text">Dostępna nowa wersja oprogramowania, kliknij przycisk poniżej aby ją pobrać</div>
            <button
                ${onClick(async () => { Handler.download() })}
            >Pobierz</button>
        </div>
    </div>
`);

UpdateComponent.importStyle('./src/components/update/UpdateStyle.css');

