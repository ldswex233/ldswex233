import {TestRequests} from "./requests/TestRequests.mjs";
import {SubjectRequests} from "./requests/SubjectRequests.mjs";
import {QuestionRequests} from "./requests/QuestionRequests.mjs";

class AppRequestResult {
    constructor() {
        this.test = new TestRequests();
        this.subject = new SubjectRequests();
        this.question = new QuestionRequests();
    }
}

export const AppRequest = new AppRequestResult();