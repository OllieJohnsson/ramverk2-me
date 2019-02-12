const db = require("../../db/database.js");

module.exports = (function () {
    const kmoms = [
        "kmom01", "kmom02", "kmom03", "kmom04", "kmom05", "kmom06", "kmom10"
    ];


    function getReport(req, res, next) {
        const kmom = req.params.kmom;
        const number = kmom.slice(-2);

        if (!kmoms.includes(kmom)) {
            return next({
                status: 400
            });
        }

        const sql = "SELECT question, answer, rowID FROM reports WHERE kmom = ? ORDER BY rowID";
        db.all(sql, number, (err, rows) => {
            if (err) {
                return next(err);
            }
            res.json({
                data: rows,
                message: rows.length === 0 ? `No reports added for ${kmom}.` : ""
            });
        });
    }



    function addReport(req, res, next) {
        const kmom = req.body.kmom;
        const question = req.body.question;
        const answer = req.body.answer;

        if (!kmom) {
            return next({
                message: "No kmom"
            });
        }

        const sql = "INSERT INTO reports (kmom, question, answer) VALUES (?, ?, ?)";
        db.run(sql, [kmom, question, answer], (err) => {
            if (err) {
                err.status = 500;
                err.title = "Failed to add report";
                switch (err.errno) {
                    case 19:
                        err.message = `Question "${question}" already added for kmom ${kmom}`;
                        break;
                }
                return next(err);
            }

            res.json({
                message: `Successfully added report to kmom ${kmom}`,
                question,
                answer
            });
        });
    }



    function deleteReport(req, res, next) {
        const kmom = req.body.kmom;
        const id = req.body.id;
        const sql = "DELETE FROM reports WHERE kmom = ? AND rowID = ?";
        db.run(sql, [kmom, id], (err) => {
            res.json({
                message: `Deleted report with id: ${id}`
            });
        });
    }

    return {
        getReport,
        addReport,
        deleteReport
    };
}());
