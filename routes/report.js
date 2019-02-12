const express = require("express");
const router = express();

const user = require("../src/users/user");
const report = require("../src/reports/report");


router.post("/reports",
    (req, res, next) => user.checkToken(req, next),
    (req, res, next) => report.addReport(req, res, next));


router.delete("/reports",
    (req, res, next) => user.checkToken(req, next),
    (req, res, next) => report.deleteReport(req, res, next));


router.get("/reports/:kmom", (req, res, next) => report.getReport(req, res, next));


module.exports = router;
