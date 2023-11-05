import {WorkOverviewHandler} from "./WorkOverviewHandler.mjs";

const progressReference = new Reference();

const Handler = new WorkOverviewHandler();

export const WorkOverviewComponent = createComponent(`
    <div class="work-overview">
        <div class="header">
            <div class="controls">
                <button 
                    ${onClick(async () => { await Handler.back(); })}
                >
                    <i class="fa-solid fa-arrow-left"></i>
                </button>
                <span>Przegląd pracy</span>
                <button
                    ${onClick(async () => { await Handler.exit(); })}
                >
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div class="progress" ${progressReference}>
                <div class="field green">Nazwa przedmiotu</div>
                <div class="field">Opis pracy</div>
                <div class="field">Potwierdzenie</div>
            </div>
        </div>
    </div>
`);

export {progressReference}

WorkOverviewComponent.importStyle('./src/components/workOverview/WorkOverviewStyle.css');

