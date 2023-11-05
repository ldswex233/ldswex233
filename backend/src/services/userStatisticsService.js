const { get, update, RestStatement, WhereStatement, insert } = require("../utils/mysql");

class UserStatistics {
    /**
     * 
     * @param {Number} userId 
     * @param {Number} tests 
     * @param {Number} questions 
     * @param {Number} writes 
     */
    constructor(userId, tests, questions, writes) {
        this.userId = userId;
        this.tests = tests;
        this.questions = questions;
        this.writes = writes;
    }

    getUserId() { return this.userId; }

    getTests() { return this.tests; }

    setTests(tests) {
        this.tests = tests;

        update(`user_statistics`, {
            tests: this.tests
        }, new RestStatement().add(new WhereStatement().add("userId", this.userId)))
    }

    addTests(tests) {
        this.tests = this.tests + tests;

        this.setTests(this.tests);
    }

    getQuestions() { return this.questions; }

    setQuestions(questions) {
        this.questions = questions;

        update(`user_statistics`, {
            questions: this.questions
        }, new RestStatement().add(new WhereStatement().add("userId", this.userId)))
    }

    addQuestions(questions) {
        this.questions = this.questions + questions;

        this.setQuestions(this.questions);
    }

    getWrites() { return this.writes; }

    setWrites(writes) {
        this.writes = writes;

        update(`user_statistics`, {
            writes: this.writes
        }, new RestStatement().add(new WhereStatement().add("userId", this.userId)))
    }

    addWrites(writes) {
        this.writes = this.writes + writes;

        this.setWrites(this.writes);
    }
}

class UserStatisticsService {
    constructor() {
        this.cache = new Map();
    }

    async load() {
        const query = await get(`user_statistics`);

        for(const row of query) {
            const userStatistics = new UserStatistics(
                parseInt(row.userId),
                parseInt(row.tests),
                parseInt(row.questions),
                parseInt(row.writes)
            );

            this.cache.set(userStatistics.getUserId(), userStatistics);
        }

        console.log(`Loaded ${query.length} user statistics`)
    }

    /**
     * 
     * @param {Number} userId 
     * @returns {UserStatistics}
     */
    get(userId) {
        return this.cache.get(userId);
    }

    /**
     * Gets the UserStatistics, if not exists create ones
     * @param {Number} userId 
     * @returns {UserStatistics}
     */
    getCreate(userId) {
        if(!this.has(userId)) {
            return this.create(userId, 0, 0, 0)
        }

        return this.get(userId);
    }

    /**
     * 
     * @param {Number} userId 
     * @returns {Boolean}
     */
    has(userId) {
        return this.cache.has(userId);
    }

    /**
     * 
     * @param {Number} userId 
     * @param {Number} tests 
     * @param {Number} questions 
     * @param {Number} writes 
     * @returns {UserStatistics}
     */
    create(userId, tests, questions, writes) {
        const userStatistics = new UserStatistics(
            userId,
            tests,
            questions,
            writes
        );

        insert(`user_statistics`, {
            userId: userId,
            tests: tests,
            questions: questions,
            writes: writes
        });

        this.cache.set(userStatistics.getUserId(), userStatistics);

        return userStatistics;
    }
}

const userStatisticsService = new UserStatisticsService();

module.exports = {
    UserStatistics,
    UserStatisticsService,
    userStatisticsService: userStatisticsService
}