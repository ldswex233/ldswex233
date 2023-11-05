import {ApiUrl} from "../AppRoot.mjs";

export class TestRequests {
    constructor() {

    }

    async getAll() {
        return (await new CjsRequest(`${ApiUrl}/test/get`, "get").doRequest()).json();
    }

    async create(subjectId, name) {
        return (await new CjsRequest(`${ApiUrl}/test/create`, "post")
            .setBody({
                subjectId: subjectId,
                name: name
            })
            .doRequest())
            .json()
    }

    async edit(testId, newSubjectId, newName) {
        return (await new CjsRequest(`${ApiUrl}/test/edit`, "post")
            .setBody({
                testId: testId,
                subjectId: newSubjectId,
                name: newName
            })
            .doRequest())
            .json()
    }

    async delete(testId) {
        return (await new CjsRequest(`${ApiUrl}/test/delete`, "delete")
            .setBody({
                testId: testId
            })
            .doRequest())
            .json()
    }

    async getQuestions(testId) {
        return (await new CjsRequest(`${ApiUrl}/test/getQuestions`, "get")
            .setQuery({
                testId: testId
            })
            .doRequest())
            .json()
    }

    /**
     *
     * @param {Number} testId
     * @param {Number} questionsNumber
     * @returns {Promise<Array<{question: string, id: number, testId: number, type: string, allowRandom: boolean, correct: Array<Number>, options: Array<String>}>>}
     */
    async generateQuizQuestions(testId, questionsNumber) {
        return (await new CjsRequest(`${ApiUrl}/test/generateQuizQuestions`, "get")
            .setQuery({
                testId: testId,
                questionsNumber: questionsNumber
            })
            .doRequest())
            .json().questions
    }

    /**
     *
     * @param {Number} testId
     * @param {Number} totalQuestions
     * @param {Array<Number>} wrongQuestionsIds
     * @returns {Promise<any>}
     */
    async sendSummaryData(testId, totalQuestions, wrongQuestionsIds) {
        return (await new CjsRequest(`${ApiUrl}/test/sendSummaryData`, "post")
            .setBody({
                testId: testId,
                wrongQuestionsIds: wrongQuestionsIds,
                totalQuestions: totalQuestions
            })
            .setHeaders({ "Authorization": `Bearer ${localStorage.getItem("token")}` })
            .doRequest())
            .json()
    }
}