const express = require("express");
const router = express.Router();

router.use("/get", require("./requests/get"));

module.exports = router;
