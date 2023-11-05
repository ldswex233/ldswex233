import {NotificationError} from "../../../plugins/notification/notification.js";
import {PanelLayout} from "../../../layouts/panel/PanelLayout.mjs";
import {usernameReference} from "./../LoginComponent.mjs";
import {MainLayout} from "../../../layouts/main/MainLayout.mjs";
import {ContainerComponent} from "../../container/ContainerComponent.mjs";
import {Loader} from "../../loader/script/LoaderScript.mjs";
import {AppRequest} from "../../../assets/mjs/AppRequest.mjs";

/**
 *
 * @param {Reference} hiddenReference
 * @param {Reference} visibleReference
 * @param {Number|String} number
 */
async function addPinNumber(hiddenReference, visibleReference, number) {
    const loader = new Loader();
    const hiddenInput = hiddenReference.getElement();
    const visiblePinContainer = visibleReference.getElement();
    const visiblePinContainerChildren = Array.from(visiblePinContainer.children);

    const isBackspaceButton = number.length > 1;

    if(isBackspaceButton) {
        hiddenInput.value = hiddenInput.value.slice(0, -1);
    } else {
        hiddenInput.value += number;
    }

    visiblePinContainerChildren.forEach((el, index) => {
        const isOutOfRange = visiblePinContainerChildren.length < index;

        if(isOutOfRange) return;

        const isSelected = (hiddenInput.value.length === index)

        if(isSelected) {
            el.classList.add("focused");
        } else {
            el.classList.remove("focused")
        }

        const isFilledField = index < hiddenInput.value.length

        el.innerHTML = isFilledField ? "*" : ""
    });

    if(hiddenInput.value.length === 4) {
        await loader.enable();

        const isAuthorized = await AppRequest.user.authorize(usernameReference.getElement().value, hiddenInput.value);

        await loader.disable();

        if(isAuthorized) {
            return MainLayout
                .select(ContainerComponent)
                .loadLayout(PanelLayout)
        }

        new NotificationError(`Błąd autoryzacji`)
    }
}

export {addPinNumber};
