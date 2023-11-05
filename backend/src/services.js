const { userService } = require("./services/userService");
const { calendarService } = require("./services/calendarService");
const { testService } = require("./services/testService");
const { subjectService } = require("./services/subjectService");
const { questionService } = require("./services/questionService");
const { userStatisticsService } = require("./services/userStatisticsService");
const { testSummaryService } = require("./services/testSummaries");
const { darwboardService } = require("./services/drawboardService");


async function load() {
    await userService.load();
    await calendarService.load();
    await testService.load();
    await subjectService.load();
    await questionService.load();
    await userStatisticsService.load();
    await testSummaryService.load();
    await darwboardService.load();
}

module.exports = {
    load,
}