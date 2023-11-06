import {SelectorHandler} from "./SelectorHandler.mjs";

const Handler = new SelectorHandler();

export const SelectorPart = createPart(`
    <div class="selector"
        ${onClick((e) => { Handler.toggle(e.part, true); })}
        ${onOuterclick((e) => { Handler.toggle(e.part, false) })}
        ${onLoad((e) => { Handler.loadOptions(e.part, e.data.options); })}
    >
        <div class="selected">Nie wybrano</div>
        <div class="options" style="opacity: 0 !important; height: 0 !important;"></div>
    </div>
`);

SelectorPart.importStyle('./src/parts/selector/SelectorStyle.css');