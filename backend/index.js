const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser')

const { load } = require("./src/services");

const app = express();
app.use(cors());
//app.use(express.urlencoded({ extended: true }));
//app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const API_PREFIX = "/schoolCalendar";

app.use(`${API_PREFIX}/user`, require("./src/routes/user/user"));
app.use(`${API_PREFIX}/calendar`, require("./src/routes/calendar/calendar"));
app.use(`${API_PREFIX}/app`, require("./src/routes/app/app"));
app.use(`${API_PREFIX}/test`, require("./src/routes/test/test"));
app.use(`${API_PREFIX}/subject`, require("./src/routes/subject/subject"));
app.use(`${API_PREFIX}/question`, require("./src/routes/question/question"));
app.use(`${API_PREFIX}/recognition`, require("./src/routes/recognition/recognition"));
app.use(`${API_PREFIX}/drawboard`, require("./src/routes/drawboard/drawboard"));

load(); // load cache

app.listen(process.env.PORT, () => {
    console.log(`Server is running on localhost:${process.env.PORT}`);
});

/* WebSocket */
const { WebSocketServer } = require('ws');
const { isJson } = require("./src/utils/string");
const { wsService } = require("./src/services/wsService");
const { getPlainToken, exportTokenData } = require("./src/modules/token");
const { darwboardService } = require("./src/services/drawboardService");
const webSocketServer = new WebSocketServer({ port: 443 });

webSocketServer.on('connection', (ws) => {
    ws.send(JSON.stringify({ connected: true }))

    ws.on('message', (data) => {
        if(!isJson(data)) return;

        const json = JSON.parse(data);

        if(!json.type) return;

        switch(json.type) {
            case "register":
                if(!json.token) return;

                const tokenData = exportTokenData(json.token);

                if(!tokenData.id) return;

                wsService.create(tokenData.id, ws);
                break;
            case "bd": // broadcast drawboard
                if(
                    !json.key || isNaN(json.key)
                    || !json.turn || !["move", "line"].includes(json.turn)
                    || !json.x || isNaN(json.x)
                    || !json.y || isNaN(json.y)
                ) return;

                const key = parseInt(json.key);

                if(!darwboardService.hasKey(key)) return;

                const drawboard = darwboardService.getByKey(key);

                drawboard.getListeningUserIds().forEach(userId => {
                    if(!wsService.has(userId)) return;

                    const webSocket = wsService.get(userId);

                    webSocket.send(JSON.stringify({
                        type: "rd", // read drawboard
                        turn: json.turn,
                        x: json.x,
                        y: json.y
                    }))
                })
                break;
        }
    })
})