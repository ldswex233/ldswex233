import {Slider} from "../../components/slider/script/SliderScript.mjs";
import {BottomNavigationComponent} from "../../components/bottomNavigation/BottomNavigationComponent.mjs";
import {PanelLayout} from "../../layouts/panel/PanelLayout.mjs";

export class BottomNavigationButtonHandler {
    constructor() {
        this.activeSlide = 2; // 2;
    }

    /**
     *
     * @param {HTMLElement} source
     * @param {Number} slideNumber
     */
    click(source, slideNumber) {
        this.activeSlide = new Slider().getActiveSlide() + 1;
        const slider = new Slider();

        const component = BottomNavigationComponent.toElement();
        const buttons = Array.from(component.querySelectorAll("button"));

        buttons.forEach(b => b.classList.remove("active"));

        source.classList.add("active");

        const changedSlide = this.activeSlide !== slideNumber;
        // const changedSlide = slider.getActiveSlide() !== slideNumber;

        if(!changedSlide) return;

        slider.move((this.activeSlide - 1), (slideNumber - 1))
        // slider.move((slider.getActiveSlide() - 1), (slideNumber - 1))

        PanelLayout.setData({ defaultSlide: slideNumber - 1 })

        // this.activeSlide = slideNumber;
    }
}