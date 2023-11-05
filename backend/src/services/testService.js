const { getNextAutoIncrementNumber, update, RestStatement, WhereStatement, remove, get, insert } = require("../utils/mysql");

class Test {
    /**
     * 
     * @param {Number} id 
     * @param {Number} subjectId 
     * @param {String} name 
     * @param {Number} permissionLevel 
     */
    constructor(id, subjectId, name, permissionLevel) {
        this.id = id;
        this.subjectId = subjectId;
        this.name = name;
        this.permissionLevel = permissionLevel;
    }

    getId() { return this.id; }
    
    getSubjectId() { return this.subjectId; }

    /**
     * 
     * @param {Number} subjectId 
     */
    setSubjectId(subjectId) {
        this.subjectId = subjectId;

        update(`tests`, { subjectId: this.subjectId }, new RestStatement().add(
            new WhereStatement().add("id", this.id)
        ))
    }

    getName() { return this.name; }

    /**
     * 
     * @param {String} name 
     */
    setName(name) {
        this.name = name;

        update(`tests`, { name: this.name }, new RestStatement().add(
            new WhereStatement().add("id", this.id)
        ))
    }

    getPermissionLevel() { return this.permissionLevel; }
}

class TestService {
    constructor() {
        this.cache = new Map();
    }

    async load() {
        const query = await get(`tests`);

        for(const row of query) {
            const test = new Test(
                parseInt(row.id),
                parseInt(row.subjectId),
                row.name,
                parseInt(row.permissionLevel)
            );

            this.cache.set(test.getId(), test)
        }

        console.log(`Loaded ${query.length} tests`)
    }

    /**
     * 
     * @param {Number} subjectId 
     * @param {String} name 
     * @returns {Test}
     */
    async create(subjectId, name) {
        const next = await getNextAutoIncrementNumber(`tests`);

        const test = new Test(next, subjectId, name, 0);

        this.cache.set(test.getId(), test);

        await insert(`tests`, {
            id: test.getId(),
            subjectId: test.getSubjectId(),
            name: test.getName(),
            permissionLevel: test.getPermissionLevel()
        });

        return test;
    }

    /**
     * 
     * @param {Number} testId 
     * @returns {Boolean}
     */
    has(testId) {
        return this.cache.has(testId);
    }

    /**
     * 
     * @param {Number} testId 
     * @returns {Test}
     */
    get(testId) {
        return this.cache.get(testId);
    }

    /**
     * 
     * @param {Number} subjectId 
     * @returns {Array<Test>}
     */
    getBySubject(subjectId) {
        let tests = [];

        for(const [key, value] of this.cache.entries()) {
            if(value.subjectId == subjectId) {
                tests.push(value);
            }
        }

        return tests;
    }

    getAll() {
        return this.cache;
    }

    /**
     * 
     * @param {Number} testId 
     */
    delete(testId) {
        this.cache.delete(testId);

        remove(`tests`, new RestStatement().add(
            new WhereStatement().add("id", testId)
        ));
    }
}

const testService = new TestService();

module.exports = {
    TestService,
    Test,
    testService: testService
}