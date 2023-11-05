const { getNextAutoIncrementNumber, insert, get, remove, RestStatement, WhereStatement } = require("../utils/mysql");

class QuestionOptions {
    /**
     * 
     * @param {Number} id 
     * @param {Number} testId 
     * @param {String} question 
     * @param {Array<String>} options 
     * @param {Arrray<Number>} correct 
     * @param {Boolean} allowRandom
     */
    constructor(id, testId, question, options, correct, allowRandom) {
        this.id = id;
        this.testId = testId;
        this.question = question;
        this.options = options;
        this.correct = correct;
        this.allowRandom = allowRandom;
    }

    getId() { return this.id; }

    getTestId() { return this.testId }

    getQuestion() { return this.question; }

    getOptions() { return this.options; }

    getCorrect() { return this.correct; }

    isRandomAllowed() { return this.allowRandom; }
}

class QuestionService {
    constructor() {
        this.cache = {
            options: new Map()
        }
    }

    async load() {
        await this.loadQuestionOptions();
    }

    unParseSeparator(array) { return array.map(e => `${e}`.replaceAll(`&semcl`, ";")) }
    parseSeparator(array) { return array.map(e => `${e}`.replaceAll(";", `&semcl`)) }

    async loadQuestionOptions() {
        const query = await get(`questions_options`);

        for(const row of query) {
            const question = new QuestionOptions(
                parseInt(row.id),
                parseInt(row.testId),
                row.question,
                this.unParseSeparator(row.options.split(";")),
                this.unParseSeparator(row.correct.split(";")).map(e => parseInt(e)),
                Boolean(parseInt(row.allowRandom))
            );

            this.cache.options.set(question.getId(), question)
        }

        console.log(`Loaded ${query.length} question options`)
    }

    /**
     * 
     * @param {Number} testId 
     * @returns {Array<QuestionOptions>}
     */
    getTestQuestions(testId) {
        const questionTypes = Object.values(this.cache);
        let testQuestions = [];

        for(const questionType of questionTypes) {
            testQuestions = testQuestions.concat(
                Array.from(questionType.values())
                    .filter(e => e.testId === testId)
                    .map(e => {
                        e.type = e.constructor.name;
                        
                        return e;
                    })
            );
        }

        return testQuestions;
    }

    /**
     * 
     * @param {QuestionOptions} question 
     */
    deleteQuestion(question) {
        if(question instanceof QuestionOptions) {
            remove(`questions_options`, new RestStatement().add(
                new WhereStatement().add("id", question.getId())
            ));

            this.cache.options.delete(question.getId())
        }
    }

    /**
     * 
     * @param {"options"} questionType 
     */
    async getNextId(questionType) {
        switch (questionType) {
            case "options":
                return (await getNextAutoIncrementNumber(`questions_options`));
            default:
                return null;
        }
    }

    /**
     * 
     * @param {QuestionOptions} question 
     */
    async create(question) {
        if(question instanceof QuestionOptions) {
            await insert(`questions_options`, {
                id: question.getId(),
                testId: question.getTestId(),
                question: question.getQuestion(),
                options: this.parseSeparator(question.getOptions()).join(";"),
                correct: this.parseSeparator(question.getCorrect()).join(";"),
                allowRandom: question.isRandomAllowed()
            });

            this.cache.options.set(question.getId(), question)
        }
    }
}

const questionService = new QuestionService();

module.exports = {
    QuestionService,
    QuestionOptions,
    questionService: questionService
}