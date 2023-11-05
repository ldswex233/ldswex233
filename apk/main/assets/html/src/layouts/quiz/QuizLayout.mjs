import {QuestionContainerComponent} from "../../components/questionContainer/QuestionContainerComponent.mjs";
import {SliderComponent} from "../../components/slider/SliderComponent.mjs";
import {Slider} from "../../components/slider/script/SliderScript.mjs";
import {QuestionBasicClosePart} from "../../parts/questionBasicClose/QuestionBasicClosePart.mjs";
import {AppRequest} from "../../assets/mjs/AppRequest.mjs";
import {QuestionContainerHandler} from "../../components/questionContainer/QuestionContainerHandler.mjs";
import {TestSummaryPart} from "../../parts/testSummary/TestSummaryPart.mjs";
import {MainLayout} from "../main/MainLayout.mjs";
import {ContainerComponent} from "../../components/container/ContainerComponent.mjs";
import {PanelLayout} from "../panel/PanelLayout.mjs";
import {NotificationError} from "../../plugins/notification/notification.js";

export const QuizLayout = new LayoutLoader(createLayout(
    [
        [
            QuestionContainerComponent,
            [
                [SliderComponent]
            ]
        ]
    ]
));

QuizLayout.setDefaultData({
    answers: {},
    questions: [],
    testId: null,
    questionsToLoad: 5 // default
})

QuizLayout.onLoad(async () => {
    const questions = await AppRequest.test.generateQuizQuestions(
        QuizLayout.data.testId,
        QuizLayout.data.questionsToLoad
    );

    if(questions.length === 0) {
        new NotificationError(`Ten test nie ma pytań`)

        return MainLayout
            .select(ContainerComponent)
            .loadLayout(PanelLayout);
    }

    QuizLayout.data.questions = questions;

    const slider = new Slider();

    slider.setDefaultSlide(0);

    new QuestionContainerHandler().setProgress(4)

    const totalSlides = questions.length + 1;
    const eachSlideVw = 100 / totalSlides
    const summaryElement = TestSummaryPart.toElement();

    summaryElement.style.width = `${eachSlideVw}vw`;

    questions.forEach(question => {
        const element = QuestionBasicClosePart
            .setData({
                isMultiple: (question.correct.length > 1),
                allowRandom: question.allowRandom,
                question: {
                    id: question.id,
                    text: question.question,
                },
                options: question.options
            })
            .toElement();

        element.style.width = `${eachSlideVw}vw`; // fix slider width of element

        slider.addSlide(element);
    });

    slider.addSlide(summaryElement)
})