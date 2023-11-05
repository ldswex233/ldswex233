import {DrawboardHandler} from "./DrawboardHandler.mjs";
import {AppRequest} from "../../assets/mjs/AppRequest.mjs";
import {DrawboardLayout} from "../../layouts/drawboard/DrawboardLayout.mjs";

const Handler = new DrawboardHandler();

export const DrawboardComponent = createComponent(`
    <div class="drawboard" style="    overflow: overlay;">
        <button ripple ${onClick(() => Handler.exit())} >
            <i class="fa-solid fa-xmark"></i>
        </button>
        <canvas style="background: #f5f5f5"
            ${onLoad((e) => { Handler.listenOnCanvas(e.source) })}
        ></canvas>
    </div>
`);

DrawboardComponent.onLoad((e) => {
    AppRequest.drawboard.listen(DrawboardLayout.data.connectionKey);
})

DrawboardComponent.importStyle('./src/components/drawboard/DrawboardStyle.css');

