import {SliderComponent} from "../SliderComponent.mjs";

class Slider {
    constructor() {

    }

    /**
     *
     * @returns {number} count from 0
     */
    getActiveSlide() {
        const element = SliderComponent.toElement();

        return parseInt(element.getAttribute("activeSlide"));
    }

    /**
     *
     * @returns {Element[]}
     */
    getSlides() {
        const element = SliderComponent.toElement();

        return Array.from(element.children);
    }

    /**
     *
     * @param {Number} slideNumber count from 0
     */
    setDefaultSlide(slideNumber) {
        const element = SliderComponent.toElement();
        const keyFrame = new CjsKeyFrame()
            .setSelector("> div")
            .setDuration(0)
            .addEntry({ transform: `translateX(${(slideNumber) * -100}%)` })
            .setImportant(true)

        element.className = `slider ${keyFrame.getClass()}`;
        element.setAttribute("activeSlide", `${slideNumber}`)
    }

    /**
     *
     * @param {Number} from count from 0
     * @param {Number} to count from 0
     */
    async move(from, to) {
        const element = SliderComponent.toElement();
        const keyFrame = new CjsKeyFrame()
            .setSelector("> div")
            .setDuration(500)
            .addEntry({ transform: `translateX(${(from) * -100}%)` })
            .addEntry({ transform: `translateX(${(to) * -100}%)` })
            .setImportant(true)
            .getClass()

        element.className = `slider ${keyFrame}`;
        element.setAttribute("activeSlide", `${to}`)

        await sleep(500);
    }

    addSlide(element) {
        const slider = SliderComponent.toElement();

        slider.insertAdjacentElement(`beforeend`, element);
    }

    setSlides(...elements) {
        SliderComponent.insert('');

        elements.forEach((e) => {
            this.addSlide(e);
        })
    }

    removeLastSlide() {
        const element = SliderComponent.toElement();

        element.removeChild(element.lastChild);
    }
}

export {Slider}