const express = require("express");
const router = express.Router();

router.use("/recognizeImageText", require("./requests/recognizeImageText"));

module.exports = router;
