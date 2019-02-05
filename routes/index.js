const express = require("express");
const router = new express.Router();

router.get("/", function(req, res, next) {
    res.json({
        name: "Oliver Johnsson",
        city: "Trelleborg",
        description: "Bor i en tvåa med flickvän och katt. Jag gillar att programmera, träna, spela musik och resa."
    });
});

module.exports = router;
