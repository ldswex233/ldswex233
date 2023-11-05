import {AppRequest} from "../../assets/mjs/AppRequest.mjs";
import {QuizesComponent} from "./QuizesComponent.mjs";
import {PhotoUploadLayout} from "../../layouts/photoUpload/PhotoUploadLayout.mjs";
import {ContainerComponent} from "../container/ContainerComponent.mjs";
import {MainLayout} from "../../layouts/main/MainLayout.mjs";
import {QuizSubjectSelectorPart} from "../../parts/quizSubjectSelector/QuizSubjectSelectorPart.mjs";

export class QuizesHandler {
    constructor() {
        this.selectorVisible = true;
    }

    /**
     *
     * @param {QuizesMap} map
     * @returns {Promise<void>}
     */
    async loadSubjectSelector(map) {
        const component = QuizesComponent.toElement();
        const structures = component.querySelector(".map > .structures")
        const selector = component.querySelector(".selector");
        const subjects = await AppRequest.subject.getAll();

        const selectorData = Object.values(subjects).map(e => {
            return { name: `${e.name} (${e.tests.length})`, onClick: async () => { await map.loadMap(e.id, structures); } }
        });

        selector.insertAdjacentElement(`afterbegin`,
            QuizSubjectSelectorPart.setData({ options: selectorData }).toElement()
        )
    }

    openFileSelector() {
        const input = createElement(`<input type="file" style="display: none;">`).toElement();

        QuizesComponent.toElement().appendChild(input);

        input.click();

        input.addEventListener('change', async (e) => {
            const files = e.target.files;

            if(files.length === 0) return input.remove();

            MainLayout
                .select(ContainerComponent)
                .loadLayout(PhotoUploadLayout.setData({ image: files[0] }));



            //const data = await AppRequest.recognition.recognizeImageText(files[0]);
        })
    }
}