const express = require("express");
const router = express.Router();

router.use("/get", require("./requests/get"));
router.use("/create", require("./requests/create"));
router.use("/edit", require("./requests/edit"));
router.use("/delete", require("./requests/delete"));
router.use("/getQuestions", require("./requests/getQuestions"));
router.use("/generateQuizQuestions", require("./requests/generateQuizQuestions"));
router.use("/sendSummaryData", require("./requests/sendSummaryData"));

module.exports = router;
