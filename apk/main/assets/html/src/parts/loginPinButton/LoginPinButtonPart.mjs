import {LoginPinButtonHandler} from "./LoginPinButtonHandler.mjs";

const Handler = new LoginPinButtonHandler();

export const LoginPinButtonPart = createPart(`
    <button ripple
        ${onClick((event) => { Handler.click(event.data); }) }
    >
        ${text("number")}
    </button>
`);
