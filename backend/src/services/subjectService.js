const { get } = require("../utils/mysql");

class Subject {
    /**
     * 
     * @param {Number} id 
     * @param {String} name 
     */
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    getId() { return this.id; }
}

class SubjectService {
    constructor() {
        this.cache = new Map();
    }

    async load() {
        const query = await get(`subjects`);

        for(const row of query) {
            const subject = new Subject(
                parseInt(row.id),
                row.name
            );

            this.cache.set(subject.getId(), subject);
        }

        console.log(`Loaded ${query.length} subjects`);
    }

    /**
     * 
     * @param {Number} subjectId 
     * @returns {Subject}
     */
    get(subjectId) {
        return this.cache.get(subjectId);
    }

    /**
     * 
     * @param {Number} subjectId 
     * @returns {Boolean}
     */
    has(subjectId) {
        return this.cache.has(subjectId);
    }

    getAll() {
        return this.cache;
    }
}

const subjectService = new SubjectService();

module.exports = {
    Subject,
    SubjectService,
    subjectService: subjectService
}