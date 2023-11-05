const express = require("express");
const { authenticateToken, getPlainToken, exportTokenData } = require("../../../modules/token");
const formidable = require('formidable');
const router = express.Router();
const fs = require('fs');
const Tesseract = require('tesseract.js');
const { wsService } = require("../../../services/wsService");

require("dotenv").config();

router.post("/", authenticateToken, async (req, res) => {
    const tokenData = exportTokenData(getPlainToken(req));

    if(!tokenData.id) {
        return res.status(500).json({ message: "Błąd autoryzacji" })
    }

    const form = formidable({ multiples: false, uploadDir: `./assets/private/temp` });

    form.parse(req, async (err, fields, files) => {
        if(err) { return res.status(500).send(err); }
    
        const filesExists = Object.keys(files).length > 0;

        if(!filesExists) return res.status(404).json({ message: "Nie znaleziono żadnych plików" })

        const file = files.image;

        /* Check for correct mime type format - if it is an image or not */
        if(!file.mimetype.includes("image/")) {
            fs.unlinkSync(file.filepath);

            return res.status(500).json({ message: "Wrong image format, expected mimeType: 'image/'" });
        }

        if(!wsService.has(tokenData.id)) return res.status(500).json({ message: "Błąd połączenia WebSocket" })

        const ws = wsService.get(tokenData.id);

        //ws.send(JSON.stringify({ type: "IMAGE_RECOGNITION", status: "recognizing text", progress: 1 }));

        //await new Promise((res) => { setTimeout(() => { res() }, 500) });

        //return res.status(200).json({ status: 'ok', text: 'ZAMIAST - INSTEAD\nHANDEL - TRADE\nKABEL - WIRE\n\nBATYK - STICK\nOLBRZYMI -ENORMOUS\n' })
        
        
        Tesseract.recognize(
            file.filepath,
            'pol',
            { logger: (info) => {
                //if(info.status !== "recognizing text") return;

                ws.send(JSON.stringify({ type: "IMAGE_RECOGNITION", status: info.status, progress: info.progress }))
            } }
        ).then(({ data: { text } }) => {
            return res
                .status(200)
                .json({ status: 'ok', text: text })
        });
    });
});

module.exports = router;
