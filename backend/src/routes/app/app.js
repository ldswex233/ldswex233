const express = require("express");
const router = express.Router();

router.use("/checkVersion", require("./requests/checkVersion"));

module.exports = router;
