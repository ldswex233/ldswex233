const express = require("express");
const { authenticateToken } = require("../../../modules/token");
const { calendarService } = require("../../../services/calendarService");
const router = express.Router();

router.get("/", authenticateToken, (req, res) => {
    return res
        .status(200)
        .json({ calendar: calendarService.getAll() });
})

module.exports = router;