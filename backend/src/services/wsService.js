class WsService {
    constructor() {
        this.cache = new Map(); // userId, ws
    }

    /**
     * 
     * @param {Number} userId 
     * @param {WebSocket} ws 
     */
    create(userId, ws) {
        this.cache.set(userId, ws);
    }

    /**
     * 
     * @param {Number} userId 
     */
    delete(userId) {
        this.cache.delete(userId);
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
     * @returns {WebSocket}
     */
    get(userId) {
        return this.cache.get(userId);
    }
}

const wsService = new WsService();

module.exports = {
    WsService,
    wsService: wsService
}