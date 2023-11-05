import {LoginPinButtonPart} from "../../parts/loginPinButton/LoginPinButtonPart.mjs";

export class LoginHandler {
    constructor() { }

    loadPinButtons(source, pinInputReference, visiblePinReference, a) {
        [1,2,3,4,5,6,7,8,9, "", 0, "<i class='fas fa-backspace' style='font-size: 25px'></i>"].forEach(num => {
            source.insertAdjacentElement(`beforeend`, LoginPinButtonPart
                .setData(
                    {
                        pinInput: pinInputReference,
                        visiblePin: visiblePinReference,
                        number: num,
                    }
                )
                .toElement())
        });
    }
}