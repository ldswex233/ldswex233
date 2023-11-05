import {NotificationError} from "../../../plugins/notification/notification.js";
import {ApiUrl} from "../AppRoot.mjs";

export class CalendarRequests {
    constructor() {

    }

    async getAllWorks() {
        const request = await new CjsRequest(`${ApiUrl}/calendar/getAll`, "get")
            .setHeaders({ "Authorization": `Bearer ${localStorage.getItem("token")}` })
            .doRequest();

        const json = request.json();

        if(request.isError()) {
            new NotificationError(`Błąd: ${request.getStatusCode()}`);

            return {};
        }

        return json.calendar;
    }

    async getWorks(year, month, day) {
        const request = await new CjsRequest(`${ApiUrl}/calendar/getDay`, "get")
            .setQuery({ year: year, month: month, day: day })
            .setHeaders({ "Authorization": `Bearer ${localStorage.getItem("token")}` })
            .doRequest();

        const json = request.json();

        if(request.isError()) {
            new NotificationError(json.message);

            return {};
        }

        return json.day;
    }

    async deleteWork(workId) {
        const request = await new CjsRequest(`${ApiUrl}/calendar/delete`, "delete")
            .setBody({workId: workId})
            .setHeaders({"Authorization": `Bearer ${localStorage.getItem("token")}`})
            .doRequest()

        const json = request.json();

        if (request.isError()) {
            new NotificationError(json.message);
        }

        return true;
    }

    async editWork(workId, subject, description, type) {
        const request = await new CjsRequest(`${ApiUrl}/calendar/edit`, "post")
            .setBody({ workId: workId, subject: subject, description: description, type: type, })
            .setHeaders({ "Authorization": `Bearer ${localStorage.getItem("token")}` })
            .doRequest()

        const json = request.json();

        if(request.isError()) {
            new NotificationError(json.message);

            return false;
        }

        return true;
    }

    async createWork(year, month, day, subject, description, type) {
        const request = await new CjsRequest(`${ApiUrl}/calendar/create`, "post")
            .setBody({
                year: year,
                month: month,
                day: day,
                subject: subject,
                description: description,
                type: type
            })
            .setHeaders({ "Authorization": `Bearer ${localStorage.getItem("token")}` })
            .doRequest();

        const json = request.json();

        if(request.isError()) {
            new NotificationError(json.message);

            return false;
        }

        return true;
    }
}