import {BottomNavigationComponent} from "./BottomNavigationComponent.mjs";
import {BottomNavigationButtonPart} from "../../parts/bottomNavigationButton/BottomNavigationButtonPart.mjs";
import {Slider} from "../slider/script/SliderScript.mjs";

export class BottomNavigationHandler {
    constructor() {
    }

    loadButtons() {
        const buttonsIcons = ["fa-map", "fa-calendar-plus", "fa-user"];
        const element = BottomNavigationComponent.toElement();
        const slider = new Slider();

        buttonsIcons.forEach((icon, index) => {
            const realIndex = index + 1;

            element.appendChild(
                BottomNavigationButtonPart
                    .setData({ index: realIndex, fa: icon, class: (realIndex === slider.getActiveSlide() + 1) ? `active` : "", })
                    .toElement()
            )
        })
    }
}