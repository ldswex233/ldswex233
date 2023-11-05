import {TestSummaryPart} from "./TestSummaryPart.mjs";
import {QuizLayout} from "../../layouts/quiz/QuizLayout.mjs";
import {TestSummaryQuestionPart} from "../testSummaryQuestion/TestSummaryQuestionPart.mjs";
import {AppRequest} from "../../assets/mjs/AppRequest.mjs";

export class TestSummaryHandler {
    constructor() { }

    async createSummary() {
        const component = TestSummaryPart.findAllExistingParts()[0];
        const card = component.querySelectorAll(".card");
        const progress = card[0].querySelector("progress");
        const percentageText = card[0].querySelector(".top > span:last-child");
        const correctText = card[0].querySelector(".sub > span:first-child");
        const wrongText = card[0].querySelector(".sub > span:last-child");
        const list = card[1].querySelector(".list");

        let correctAnswers = 0;
        let wrongAnswers = 0;
        const wrongQuestionsIds = [];

        for(const question of QuizLayout.data.questions) {
            let answer = [];

            if(question.id in QuizLayout.data.answers) {
                answer = QuizLayout.data.answers[question.id];
            }

            const isCorrect = (answer.sort().join(",") === question.correct.sort().join(","));
            const userChoices = answer.map(e => `${question.options[e - 1]}`);
            const answers = question.correct.map(e => `${question.options[e - 1]}`);

            if(isCorrect) {
                correctAnswers++;
            } else {
                wrongAnswers++;

                wrongQuestionsIds.push(question.id);
            }

            list.insertAdjacentElement(`beforeend`,
                TestSummaryQuestionPart
                    .setData({
                        question: question.question,
                        correct: isCorrect,
                        userChoices: userChoices,
                        answers: answers
                    })
                    .toElement()
            )
        }

        const totalQuestions = correctAnswers + wrongAnswers;

        progress.value = correctAnswers;
        progress.max = totalQuestions;

        percentageText.innerHTML = `${((correctAnswers / totalQuestions) * 100).toFixed(0)}%`;
        correctText.innerHTML = `Poprawne odp: <span class="gray">${correctAnswers}</span>`;
        wrongText.innerHTML = `Błędne odp: <span class="gray">${wrongAnswers}</span>`;

        const testId = QuizLayout.data.testId;

        QuizLayout.resetToDefaultData();

        await AppRequest.test.sendSummaryData(testId, totalQuestions, wrongQuestionsIds)
    }
}