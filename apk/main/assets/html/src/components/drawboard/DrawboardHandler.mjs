import {WebSocket} from "../../Root.mjs";
import {MainLayout} from "../../layouts/main/MainLayout.mjs";
import {ContainerComponent} from "../container/ContainerComponent.mjs";
import {PanelLayout} from "../../layouts/panel/PanelLayout.mjs";

export class DrawboardHandler {
    constructor() {
        this.captureId = null;
    }

    /**
     *
     * @param {HTMLCanvasElement} canvas
     */
    listenOnCanvas(canvas) {
        canvas.width = window.innerWidth * 3;
        canvas.height = window.innerHeight * 3;

        const ctx = canvas.getContext('2d');

        this.captureId = WebSocket.createCapture((e) => {
            const json = JSON.parse(e.data);

            if(json.type !== "rd") return; // read drawboard

            const turn = json.turn;
            const x = parseInt(json.x);
            const y = parseInt(json.y);

            switch (turn) {
                case "move":
                    ctx.beginPath();
                    ctx.moveTo(x, y);

                    //if(y > canvas.height) { canvas.height = y; }
                    //if(x > canvas.width) { canvas.width = x; }
                    break;
                case "line":
                    ctx.lineTo(x, y);
                    ctx.stroke();

                    //if(y > canvas.height) { canvas.height = y; }
                    //if(x > canvas.width) { canvas.width = x; }
            }
        })
    }

    exit() {
        WebSocket.removeCapture(this.captureId);

        MainLayout
            .select(ContainerComponent)
            .loadLayout(PanelLayout)
    }
}