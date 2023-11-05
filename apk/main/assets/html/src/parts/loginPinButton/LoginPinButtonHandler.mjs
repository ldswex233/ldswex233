import {addPinNumber} from "../../components/login/script/LoginScript.mjs";

export class LoginPinButtonHandler {
    constructor() {
    }

    /**
     *
     * @param {{pinInput: Reference, visiblePin: Reference, number: number}} data
     */
    click(data) {
        const { pinInput, visiblePin, number } = data;

        addPinNumber(pinInput, visiblePin, number)
    }
}