import {ExpanderimgHandler} from "./ExpanderimgHandler.mjs";

const Handler = new ExpanderimgHandler();

export const ExpanderimgComponent = createComponent(`
    <div>
        <button
            ${onClick((e) => Handler.trigger())}
        >EXPAND!</button>
    </div>
`);

ExpanderimgComponent.importStyle('./src/components/expanderimg/ExpanderimgStyle.css');

