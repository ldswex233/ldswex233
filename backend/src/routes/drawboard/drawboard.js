const express = require("express");
const router = express.Router();

router.use("/create", require("./requests/create"));
router.use("/listen", require("./requests/listen"));

module.exports = router;
