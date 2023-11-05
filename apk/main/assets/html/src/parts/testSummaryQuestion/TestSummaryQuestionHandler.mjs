export class TestSummaryQuestionHandler {
    constructor() { }

    /**
     *
     * @param {HTMLElement}source
     * @param {{correct: boolean, userChoices: string[], answers: string[]}} data
     */
    loadReview(source, data) {
        data.answers.forEach(answer => {
            source.insertAdjacentHTML(`beforeend`, `<div class="correct">${answer}</div>`);
        })

        if(!data.correct) {
            data.userChoices.forEach(userChoice => {
                source.insertAdjacentHTML(`beforeend`, `<div class="selected">${userChoice}</div>`)
            })
        }
    }
}