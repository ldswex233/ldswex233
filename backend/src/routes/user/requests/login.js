const { sign } = require("jsonwebtoken");
const express = require("express");
const { userService } = require("../../../services/userService");
const router = express.Router();

require("dotenv").config();

router.post("/", async (req, res) => {
    const body = req.body;

    if(!body.username || !body.pin) 
        return res
            .status(401)
            .json({ message: "Brak parametru username lub pin" });
    
    const { username, pin } = body;

    if(!userService.has(username))
        return res
            .status(401)
            .json({ message: "Błędna nazwa użytkownika lub pin" });

    

    const user = userService.get(username);

    if(user.getPin() !== pin) 
        return res
            .status(401)
            .json({ message: "Błędna nazwa użytkownika lub pin" });

    const data = {
        id: user.getId(),
        username: user.getUsername(),
        pin: user.getPin()
    }

    const token = sign(data, process.env.ACCESS_TOKEN, {
        expiresIn: "2d",
    })

    return res
        .status(200)
        .json({ message: "Pomyślnie zalogowano", token: token })
});

module.exports = router;