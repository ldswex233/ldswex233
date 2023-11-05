const { get, getNextAutoIncrementNumber, insert } = require("../utils/mysql");

class TestSummary {
    /**
     * 
     * @param {Number} id 
     * @param {Number} userId 
     * @param {Number} testId 
     * @param {Object} data 
     * @param {Number} createdTimestamp
     */
    constructor(id, userId, testId, data, createdTimestamp) {
        this.id = id;
        this.userId = userId;
        this.testId = testId;
        this.data = data;
        this.createdTimestamp = createdTimestamp;
    }

    getId() { return this.id; }

    getUserId() { return this.userId; }

    getTestId() { return this.testId; }

    getData() { return this.data; }

    getCreatedTimestamp() { return this.createdTimestamp; }
}

class UserTestSummaries {
    /**
     * 
     * @param {Array<TestSummary>} summaires 
     */
    constructor(summaires) {
        this.summaries = summaires;

        this.length = this.summaries.length;
    }

    /**
     * 
     * @param {Number} id 
     * @returns {Boolean}
     */
    has(id) {
        return this.summaries.filter(e => e.id === id).length > 0;
    }

    /**
     * 
     * @param {Number} id 
     * @returns {Array<TestSummary>}
     */
    get(id) {
        if(!this.has(id)) return [];

        return this.summaries.filter(e => e.id === id);
    }

    /**
     * 
     * @param {Number} testId 
     * @returns {Array<TestSummary>}
     */
    getByTestId(testId) {
        return this.summaries.filter(e => e.testId === testId);
    }

    
}

class TestSummaryService {
    constructor() {
        this.cache = new Map(); // id, summary
    }

    async load() {
        const query = await get(`tests_summaries`);

        for(const row of query) {
            const summary = new TestSummary(
                parseInt(row.id),
                parseInt(row.userId),
                parseInt(row.testId),
                JSON.parse(row.data),
                parseInt(row.createdTimestamp)
            );

            this.cache.set(summary.getId(), summary);
        }
        
        console.log(`Loaded ${query.length} test summaries`)
    }

    /**
     * 
     * @param {Number} userId 
     * @param {Number} testId 
     * @param {Object} data
     * @returns {TestSummary} 
     */
    async create(userId, testId, data) {
        const summary = new TestSummary(
            (await getNextAutoIncrementNumber(`tests_summaries`)),
            userId,
            testId,
            JSON.stringify(data),
            new Date().getTime()
        );

        insert(`tests_summaries`, {
            id: summary.getId(),
            userId: summary.getUserId(),
            testId: summary.getTestId(),
            data: summary.getData(),
            createdTimestamp: summary.getCreatedTimestamp()
        });

        this.cache.set(summary.getId(), summary);

        return summary;
    }

    /**
     * 
     * @param {Number} userId 
     * @returns {UserTestSummaries}
     */
    getUserSummaries(userId) {
        const values = Array.from(this.cache.values()).filter(e => e.userId === userId);

        return new UserTestSummaries(values);
    }
}

const testSummaryService = new TestSummaryService();

module.exports = {
    TestSummary,
    TestSummaryService,
    UserTestSummaries,
    testSummaryService: testSummaryService,
}