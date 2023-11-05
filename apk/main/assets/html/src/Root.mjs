import {PlainApiAddress} from "./assets/mjs/AppRoot.mjs";

Root.setDocumentData({
    title: "Kalendarz szkolny",
    icon: "./src/assets/images/logo.png",
});

export const WebSocket = new CjsWebSocket().connect(`ws://${PlainApiAddress}:443/`);

