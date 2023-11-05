const { get, getNextAutoIncrementNumber, insert } = require("../utils/mysql");
const { getRandom } = require("../utils/numeric");

class Drawboard {
    /**
     * 
     * @param {Number} id 
     * @param {Number} key 
     * @param {Number} createdTimestamp
     */
    constructor(id, key, createdTimestamp) {
        this.id = id;
        this.key = key;
        this.createdTimestamp = createdTimestamp;
        /**
         * @type {Array<Number>}
         */
        this.listeningUserIds = [];
    }

    getId() { return this.id; }

    getKey() { return this.key; }

    getCreatedTimestamp() { return this.createdTimestamp; }

    getListeningUserIds() { return this.listeningUserIds; }

    addListeningUserId(userId) {
        this.listeningUserIds.push(userId);
    }

    removeListeningUserId(userId) {
        this.listeningUserIds = this.listeningUserIds.filter(e => e !== userId);
    }
}

class DrawboardService {
    constructor() {
        this.cache = new Map();
    }

    async load() {
        const query = await get(`drawboards`);

        for(const row of query) {
            const drawboard = new Drawboard(
                parseInt(row.id),
                parseInt(row.key),
                parseInt(row.createdTimestamp)
            )
        
            this.cache.set(drawboard.getId(), drawboard);
        }

        console.log(`Loaded ${query.length} drawboards`)
    }

    /**
     * 
     * @returns {Drawboard}
     */
    async create() {
        let key = null;

        while(key === null || this.hasKey(key)) {
            key = getRandom(100000, 999999);
        }

        const drawboard = new Drawboard(
            (await getNextAutoIncrementNumber(`drawboards`)),
            key,
            new Date().getTime()
        );

        insert(`drawboards`, {
            id: drawboard.getId(),
            key: drawboard.getKey(),
            createdTimestamp: drawboard.getCreatedTimestamp()
        })

        return drawboard;
    }

    /**
     * 
     * @param {Number} key 
     * @returns {Boolean}
     */
    hasKey(key) {
        return Array.from(this.cache.values()).filter(e => e.key === key).length > 0;
    }

    /**
     * 
     * @param {Number} key 
     * @returns {Drawboard}
     */
    getByKey(key) {
        return Array.from(this.cache.values()).filter(e => e.key === key)[0];
    }
}

const darwboardService = new DrawboardService();

module.exports = {
    Drawboard,
    DrawboardService,
    darwboardService: darwboardService
}