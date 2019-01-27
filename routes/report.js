const express = require('express');
const router = express();

const user = require('../models/user');
const report = require('../models/report');


router.post("/reports",
    (req, res, next) => user.checkToken(req, res, next),
    (req, res, next) => report.addReport(req, res, next));


router.delete("/report",
    (req, res, next) => user.checkToken(req, res, next),
    (req, res, next) => report.deleteReport(req, res, next));


router.get('/reports/:kmom', (req, res, next) => report.getReport(req, res, next));


module.exports = router;
