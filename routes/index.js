const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    const data = {
        data: {
            name: "Oliver Johnsson",
            city: "Trelleborg",
            description: "Bor i en tvåa med flickvän och katt. Jag gillar att programmera, träna, spela musik och resa."
        }
    };
    res.json(data);
});

module.exports = router;
