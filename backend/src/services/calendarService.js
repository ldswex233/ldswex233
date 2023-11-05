const { get, remove, RestStatement, WhereStatement, update, insert, getNextAutoIncrementNumber } = require("../utils/mysql");
const { User, userService } = require("./userService");

class CalendarWork {
    /**
     * 
     * @param {Number} id 
     * @param {Number} year
     * @param {Number} month
     * @param {Number} day
     * @param {String} subject 
     * @param {String} description 
     * @param {String} type
     * @param {User} author 
     * @param {Number} quizId
     */
    constructor(id, year, month, day, subject, description, type, author, quizId) {
        this.id = id;
        this.year = year;
        this.month = month;
        this.day = day;
        this.subject = subject;
        this.description = description;
        this.type = type;
        this.author = author;
        this.quizId = quizId;
    }

    getId() {
        return this.id;
    }

    getYear() {
        return this.year;
    }

    getMonth() {
        return this.month;
    }

    getDay() {
        return this.day;
    }

    getSubject() {
        return this.subject;
    }

    setSubject(subject) {
        this.subject = subject;

        update(`calendar_works`, { subject: this.subject }, new RestStatement().add(
            new WhereStatement().add("id", this.id)
        ))
    }

    getDescription() {
        return this.description;
    }

    setDescription(description) {
        this.description = description;

        update(`calendar_works`, { description: this.description }, new RestStatement().add(
            new WhereStatement().add("id", this.id)
        ))
    }

    getType(type) {
        return this.type;
    }

    setType(type) {
        this.type = type;

        update(`calendar_works`, { type: this.type }, new RestStatement().add(
            new WhereStatement().add("id", this.id)
        ))
    }

    getAuthor() {
        return this.author;
    }

    getQuizId() {
        return this.quizId;
    }
}

class CalendarService {
    constructor() {
        this.cache = new Map();
    }

    async load() {
        const query = await get(`calendar_works`);

        for(const row of query) {
            const work = new CalendarWork(
                parseInt(row.id),
                parseInt(row.year),
                parseInt(row.month),
                parseInt(row.day),
                row.subject,
                row.description,
                row.type,
                userService.getById(parseInt(row.authorId)),
                parseInt(row.quizId)
            );

            this.cache.set(work.getId(), work)
        }

        console.log(`Loaded ${query.length} calendar works`)
    }

    /**
     * 
     * @param {Number} id 
     * @returns {CalendarWork}
     */
    get(id) {
        return this.cache.get(parseInt(id));
    }

    getAll() {
        const parsed = {};

        for(const [key, value] of this.cache.entries()) {
            parsed[key] = {
                id: value.id,
                year: value.year,
                month: value.month,
                day: value.day,
                subject: value.subject,
                description: value.description,
                type: value.type,
                author: {
                    id: value.author.id,
                    username: value.author.username,
                },
                quizId: value.quizId
            }
        }

        return parsed;
    }

    /**
     * 
     * @param {Number} year 
     * @param {Number} month 
     * @param {Number} day 
     * @returns {Array<CalendarWork>}
     */
    getByDay(year, month, day) {
        const filter = Array
            .from(this.cache.values())
            .filter(e => e.year === parseInt(year) && e.month === parseInt(month) && e.day === parseInt(day))
            .map(e => { 
                return {
                    id: e.id, 
                    year: e.year,
                    month: e.month,
                    day: e.day,
                    subject: e.subject,
                    description: e.description,
                    type: e.type,
                    author: {
                        id: e.author.id,
                        username: e.author.username
                    },
                    quizId: e.quizId
                }
            });

        return filter;
    }

    /**
     * 
     * @param {Number} year
     * @param {Number} month
     * @param {Number} day
     * @param {String} subject 
     * @param {String} description 
     * @param {String} type
     * @param {Number} authorId 
     * @returns {CalendarWork}
     */
    async create(year, month, day, subject, description, type, authorId) {
        const calendarWork = new CalendarWork(
            await getNextAutoIncrementNumber(`calendar_works`),
            parseInt(year),
            parseInt(month),
            parseInt(day),
            subject,
            description,
            type,
            userService.getById(parseInt(authorId)),
            0
        )

        this.cache.set(calendarWork.getId(), calendarWork);

        insert(`calendar_works`, {
            subject: calendarWork.getSubject(),
            year: calendarWork.getYear(),
            month: calendarWork.getMonth(),
            day: calendarWork.getDay(),
            description: calendarWork.getDescription(),
            type: calendarWork.getType(),
            authorId: calendarWork.getAuthor().getId(),
            quizId: 0
        });
        
        return calendarWork;
    }

    /**
     * 
     * @param {Number} id 
     * @returns {Boolean}
     */
    has(id) {
        return this.cache.has(parseInt(id));
    }

    delete(id) {
        this.cache.delete(parseInt(id));

        remove(`calendar_works`, new RestStatement().add(
            new WhereStatement().add("id", id)
        ))
    }
}

const calendarService = new CalendarService();

module.exports = {
    CalendarWork,
    CalendarService,
    calendarService: calendarService
}