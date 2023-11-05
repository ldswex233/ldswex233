class Cache {
    constructor() {
        this.calendar = {};
    }

    addCalendarWork(work) {
        this.calendar[work.id] = work;
    }

    setCalendarWorks(works) {
        this.calendar = works;
    }

    hasCalendarWork(workId) {
        return workId in this.calendar;
    }

    getCalendarWork(workId) {
        return this.calendar[workId];
    }

    getCalendarWorksInDay(year, month, day) {
        const values = Object.values(this.calendar);

        return values
            .filter(e => {
                return e.year === year && e.month === month && e.day === day
            });
    }
}

const cache = new Cache();

export {cache}