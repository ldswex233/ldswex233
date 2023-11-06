import {ApiUrl} from "../AppRoot.mjs";

export class QuestionRequests {
    constructor() {
    }

    /**
     *
     * @param {Number} testId
     * @param {{question: string, options: Array<String>, correct: Array<Number>, allowRandom: boolean}} data
     */
    async createQuestionOptions(testId, data) {
        const body = {
            testId: testId,
            type: 'options',
            data: data
        };

        return (await new CjsRequest(`${ApiUrl}/question/create`, "post")
            .setBody(body)
            .doRequest()).json()
    }
}