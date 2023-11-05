const express = require("express");
const router = express.Router();

router.use("/create", require("./requests/create"));

module.exports = router;
