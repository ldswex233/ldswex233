import {WebSocket} from "../../Root.mjs";

export class DrawboardHandler {
    constructor() { }

    /**
     *
     * @param {HTMLCanvasElement} canvas
     */
    loadCanvas(canvas) {
        const MOUSE_MODES = { UP: 'up', DOWN: 'down' };

        const adjustCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        adjustCanvasSize();

        window.addEventListener('resize', adjustCanvasSize)

        const ctx = canvas.getContext('2d');
        const mouse = {
            mode: MOUSE_MODES.UP,
            position: {
                x: 0,
                y: 0
            }
        };

        ctx.strokeStyle = 'black';

        canvas.addEventListener('pointerdown', function(e) {
            mouse.position.x = e.pageX - this.offsetLeft;
            mouse.position.y = e.pageY - this.offsetTop;

            ctx.beginPath();
            ctx.moveTo(mouse.position.x, mouse.position.y);

            WebSocket.sendJson({
                type: "bd",
                key: `000000`,
                turn: "move",
                x: mouse.position.x,
                y: mouse.position.y
            })

            mouse.mode = MOUSE_MODES.DOWN;
        });

        canvas.addEventListener('pointerup', () => {
            mouse.mode = MOUSE_MODES.UP;
        });

        canvas.addEventListener('pointermove', function(e) {
            mouse.position.x = e.pageX - this.offsetLeft;
            mouse.position.y = e.pageY - this.offsetTop;

            if(mouse.mode !== MOUSE_MODES.DOWN) return;

            ctx.lineTo(mouse.position.x, mouse.position.y);
            ctx.stroke();

            WebSocket.sendJson({
                type: 'bd',
                key: `000000`,
                turn: "line",
                x: mouse.position.x,
                y: mouse.position.y
            })
        })
    }
}