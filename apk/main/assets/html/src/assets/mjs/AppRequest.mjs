import {CalendarRequests} from "./requests/CalendarRequests.mjs";
import {UserRequests} from "./requests/UserRequests.mjs";
import {AppRequests} from "./requests/AppRequests.mjs";
import {Loader} from "../../components/loader/script/LoaderScript.mjs";
import {SubjectRequests} from "./requests/SubjectRequests.mjs";
import {RecognitionRequests} from "./requests/RecognitionRequests.mjs";
import {QuestionRequests} from "./requests/QuestionRequests.mjs";
import {TestRequests} from "./requests/TestRequests.mjs";
import {DrawboardRequests} from "./requests/DrawboardRequests.mjs";

class AppRequestResult {
    constructor() {
        this.calendar = new CalendarRequests();
        this.user = new UserRequests();
        this.app = new AppRequests();
        this.subject = new SubjectRequests();
        this.recognition = new RecognitionRequests();
        this.question = new QuestionRequests();
        this.test = new TestRequests();
        this.drawboard = new DrawboardRequests();
    }
}

export async function onRequestStart() {
    await new Loader().enable();
}

export async function onRequestEnd() {
    await new Loader().disable();
}

export const AppRequest = new AppRequestResult();