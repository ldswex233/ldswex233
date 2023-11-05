import {LoaderComponent} from "../LoaderComponent.mjs";
import {ContainerComponent} from "../../container/ContainerComponent.mjs";

class Loader {
    constructor() {
    }

    /**
     *
     * @param {Number} extraLoadMs
     * @return {Promise<void>}
     */
    async enable(extraLoadMs = 0) {
        const element = LoaderComponent.toElement();
        element.style.display = 'block';

        createFilter(ContainerComponent.toElement(), { filter: "blur", time: 200, amount: 100 }).then()

        await createFilter(element, { filter: "blur", time: 300, amount: 100 })
        await sleep(extraLoadMs);
    }

    async disable() {
        const element = LoaderComponent.toElement();

        createFilter(element, { filter: "blur", time: 300, amount: 100 }).then();

        element.style.display = 'none';

        await createFilter(ContainerComponent.toElement(), { filter: "blur", time: 200, amount: 100, direction: "reverse" })
    }
}

export {Loader}