import {LoginPinButtonPart} from "../../parts/loginPinButton/LoginPinButtonPart.mjs";
import {LoginHandler} from "./LoginHandler.mjs";

const pinInputReference = new Reference();
const visiblePinReference = new Reference();
const usernameReference = new Reference();

const Handler = new LoginHandler();

export const LoginComponent = createComponent(`
    <div class="login">
        <div class="header"
            ${onClick((e) => { console.log('clicked') })}
        >
            <div class="text">Logowanie jako</div>
            <input type="text" ${usernameReference} value="${localStorage.getItem("username") || ''}">
        </div>
        <div class="body">
            <div class="visible-pin" ${visiblePinReference}>
                <div class="field focused"></div>
                <div class="field"></div>
                <div class="field"></div>
                <div class="field"></div>
            </div>
            <input ${pinInputReference} type="hidden">
            <div class="pin-container"
                ${onLoad((e) => { Handler.loadPinButtons(e.source, pinInputReference, visiblePinReference, 's') })}
            ></div>
        </div>
    </div>
`);

export {usernameReference}

LoginComponent.importStyle('./src/components/login/LoginStyle.css');

