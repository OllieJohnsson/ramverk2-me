const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');

router.get('/add', function(req, res, next) {
    db.run("INSERT INTO users (email, password) VALUES (?, ?)",
    "user11@example.com",
    "superlonghashedpasswordthatwewillseehowtohashinthenextsection", (err) => {
        if (err) {
            res.json(err);
            return;
        }

        res.end("success");
    });
    // res.json(data);
});


router.get('/', (req, res, next) => {
    db.all("SELECT * FROM users", function(err, rows) {
        if (err) {
            res.json(err);
            return;
        }

        res.json(rows);
    });
});

module.exports = router;
