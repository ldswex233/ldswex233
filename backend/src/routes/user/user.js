const express = require("express");
const router = express.Router();

router.use("/login", require("./requests/login"));
router.use("/authorize", require("./requests/authorize"));
router.use("/getUsersPublicData", require("./requests/getUsersPublicData"));
router.use("/getExperienceData", require("./requests/getExperienceData"));
router.use("/getStatistics", require("./requests/getStatistics"));

module.exports = router;
