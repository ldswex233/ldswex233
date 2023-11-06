import {DrawboardHandler} from "./DrawboardHandler.mjs";

const Handler = new DrawboardHandler();

export const DrawboardComponent = createComponent(`
    <div class="drawboard">
        <canvas
            ${onLoad((e) => Handler.loadCanvas(e.source))}
        ></canvas>
    </div>
`);

DrawboardComponent.importStyle('./src/components/drawboard/DrawboardStyle.css');

