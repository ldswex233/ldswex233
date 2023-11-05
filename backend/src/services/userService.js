const { get, remove, RestStatement, WhereStatement, update } = require("../utils/mysql");

class User {
    /**
     * 
     * @param {Number} id 
     * @param {String} username 
     * @param {String} pin 
     * @param {Number} lastLoginTimestamp
     * @param {Number} experience
     */
    constructor(id, username, pin, lastLoginTimestamp, experience) {
        this.id = id;
        this.username = username;
        this.pin = pin;
        this.lastLoginTimestamp = lastLoginTimestamp;
        this.experience = experience;
    }

    getId() {
        return this.id;
    }

    getUsername() {
        return this.username;
    }

    getPin() {
        return this.pin;
    }

    setLastLoginTimestamp(lastLoginTimestamp) {
        this.lastLoginTimestamp = lastLoginTimestamp;

        update(`users`, {
            lastLoginTimestamp: this.lastLoginTimestamp
        }, new RestStatement().add(new WhereStatement().add("id", this.id)))
    }

    getLastLoginTimestamp() {
        return this.lastLoginTimestamp;
    }

    /**
     * 
     * @param {Number} experience 
     */
    setExperience(experience) {
        this.experience = experience;

        update(`users`, {
            experience: this.experience
        }, new RestStatement().add(new WhereStatement().add("id", this.id)))
    }

    /**
     * 
     * @param {Number} experience 
     */
    addExperience(experience) {
        this.experience = this.experience + experience;

        this.setExperience(this.experience);
    }

    getExperience() {
        return this.experience;
    }
}

class UserService {
    constructor() {
        this.cache = new Map();
    }

    async load() {
        const query = await get(`users`);

        for(const row of query) {
            const user = new User(
                parseInt(row.id),
                row.username,
                row.pin,
                parseInt(row.lastLoginTimestamp),
                parseInt(row.experience)
            );

            this.cache.set(user.getUsername(), user);
        }

        console.log(`Loaded ${query.length} users`);
    }

    /**
     * 
     * @param {Number} id 
     * @returns {User|Null}
     */
    getById(id) {
        const users = Array.from(this.cache.values()).filter(e => e.id === id);

        if(users.length === 0) return null;

        return users[0];
    }

    /**
     * 
     * @param {String} username
     * @returns {User}
     */
    get(username) {
        return this.cache.get(username);
    }

    getAll() {
        return this.cache;
    }

    /**
     * 
     * @param {String} username 
     * @returns {Boolean}
     */
    has(username) {
        return this.cache.has(username);
    }

    /**
     * 
     * @param {String} username 
     */
    delete(username) {
        this.cache.delete(username);

        remove(`users`, new RestStatement()
            .add(new WhereStatement().add("username", username))
        )
    }
}

const userService = new UserService();

module.exports = {
    User,
    UserService,
    userService: userService
}