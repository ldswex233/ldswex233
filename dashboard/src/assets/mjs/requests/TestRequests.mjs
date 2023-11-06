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
            .json().questions
    }
}