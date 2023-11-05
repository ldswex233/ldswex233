const express = require("express");
const { testService } = require("../../../services/testService");
const router = express.Router();

require("dotenv").config();

router.get("/", async (req, res) => {
    const body = req.body;

    if(body.testId) {
        if(isNaN(body.testId))  {
            return res
                .status(401)
                .json({ message: "Test id nie jest liczbą" })
        }

        const testId = parseInt(body.testId);

        if(!testService.has(testId)) {
            return res
                .status(404)
                .json({ message: "Nie znaleziono testu" })
        }

        const test = testService.get(testId);

        return res
            .status(200)
            .json({ test: test })
    }

    const tests = testService.getAll();

    return res
        .status(200)
        .json({ tests: Object.fromEntries(tests) })
});

module.exports = router;