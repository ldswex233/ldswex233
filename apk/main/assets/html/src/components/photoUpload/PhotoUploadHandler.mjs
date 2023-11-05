import {WebSocket} from "../../Root.mjs";
import {AppRequest} from "../../assets/mjs/AppRequest.mjs";
import {PhotoUploadLayout} from "../../layouts/photoUpload/PhotoUploadLayout.mjs";
import {PhotoUploadComponent} from "./PhotoUploadComponent.mjs";
import {PhotoUploadWordPart} from "../../parts/photoUploadWord/PhotoUploadWordPart.mjs";
import {NotificationError, NotificationSuccess} from "../../plugins/notification/notification.js";
import {MainLayout} from "../../layouts/main/MainLayout.mjs";
import {ContainerComponent} from "../container/ContainerComponent.mjs";
import {PanelLayout} from "../../layouts/panel/PanelLayout.mjs";

export class PhotoUploadHandler {
    constructor() {
        this.wordPairs = [];
    }

    async sendRequest() {
        const component = PhotoUploadComponent.toElement();
        const statusElement = component.querySelector(".header > .status");
        const progressElement = statusElement.querySelector("progress");
        const textElement = statusElement.querySelector(".text");
        const list = component.querySelector(".body > .list")

        WebSocket.createCapture((event) => {
            const json = JSON.parse(event.data);

            if(json.type !== "IMAGE_RECOGNITION") return;

            const progress = json.progress;

            switch (json.status) {
                case "loading tesseract core": textElement.innerHTML = `Uruchamianie systemu...`; break;
                case "initializing tesseract": textElement.innerHTML = `Przygotowywanie ustawień systemu...`; break;
                case "loading language traineddata": textElement.innerHTML = `Ładowanie pakietu językowego...`; break;
                case "initializing api": textElement.innerHTML = `Przygotowywanie api...`; break;
                case "recognizing text": textElement.innerHTML = `Odczytywanie tekstu...`; break;
            }

            if(progress === 1 && json.status === "recognizing text") { textElement.innerHTML = `Przetworzono zdjęcie` }

            progressElement.value = progress * 100;
        })

        const data = await AppRequest.recognition.recognizeImageText(PhotoUploadLayout.data.image);

        this.wordPairs = data.text.split("\n").filter(e => e !== '').map(e => {
            const split = (e.includes("-") ? e.split("-") : [e, 'Brak']);
            const first = split[0].trim().toLowerCase();
            const second = split[1].trim().toLowerCase();

            return [first, second]
        });

        this.wordPairs.forEach((pair, index) => {
            const element = PhotoUploadWordPart.setData({ first: pair[0], second: pair[1] }).toElement();
            const inputs = element.querySelectorAll("input");

            inputs[0].addEventListener('change', (e) => { this.wordPairs[index][0] = e.target.value; })
            inputs[1].addEventListener('change', (e) => { this.wordPairs[index][1] = e.target.value; })

            list.insertAdjacentElement(`beforeend`, element);
        });
    }

    async createTest() {
        const ENGLISH_SUBJECT_ID = 3;
        const MAX_OPTIONS_IN_QUESTION = 4;

        if(this.wordPairs.length <= 1) {
            return new NotificationError(`Potrzebujesz minimum dwóch słówek, by stworzyć test`)
        }

        const date = new Date();
        const test = (await AppRequest.test.create(ENGLISH_SUBJECT_ID, `Słówka (${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()})`)).test;

        for (const pair of this.wordPairs) {
            const first = pair[0];
            const second = pair[1];

            const options = [second];

            let otherOptions = this.wordPairs.filter(e => e !== pair);

            while(options.length < MAX_OPTIONS_IN_QUESTION) {
                const randomElement = otherOptions[getRandom(0, otherOptions.length - 1)];

                options.push(randomElement[1]);

                otherOptions = otherOptions.filter(e => e !== randomElement)
            }

            const question = await AppRequest.question.createQuestionOptions(test.id, {
                question: `Przetłumacz słowo ${first}`,
                options: options,
                correct: [1],
                allowRandom: true
            })
        }

        new NotificationSuccess(`Stworzono test ${test.name}`);

        MainLayout
            .select(ContainerComponent)
            .loadLayout(PanelLayout);
    }
}