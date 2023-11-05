const express = require("express");
const router = express.Router();

router.use("/create", require("./requests/create"));
router.use("/edit", require("./requests/edit"));
router.use("/delete", require("./requests/delete"));
router.use("/getAll", require("./requests/getAll"));
router.use("/getDay", require("./requests/getDay"));

module.exports = router;
