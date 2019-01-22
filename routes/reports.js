const express = require('express');
const router = express.Router();

router.get("/kmom01", (req, res) => {
    const data = {
        data: [
            {
                question: "Berätta utförligt om din syn på nodejs backend ramverk och berätta vilket ramverk du valde och varför.",
                answer: ""
            },
            {
                question: "Berätta om din katalogstruktur och hur du organiserade din kod, hur tänkte du?",
                answer: ""
            },
            {
                question: "Använde du någon form av scaffolding som ditt valda ramverk erbjuder?",
                answer: ""
            },
            {
                question: "Vad är din TIL för detta kmom?",
                answer: ""
            }
        ]
    };

    res.json(data);
});

module.exports = router;
