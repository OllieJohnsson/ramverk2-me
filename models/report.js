const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');


module.exports = (function () {
    const kmoms = [
        'kmom01', 'kmom02', 'kmom03', 'kmom04', 'kmom05', 'kmom06', 'kmom10'
    ];


    function getReport(req, res, next) {
        const kmom = req.params.kmom;
        const number = kmom.slice(-2);

        if (!kmoms.includes(kmom)) {
            next({
                status: 400
            });
            return;
        }

        const sql = "SELECT question, answer, rowID FROM reports WHERE kmom = ? ORDER BY rowID";
        db.all(sql, number, (err, rows) => {
            if (err) {
                next(err);
                return;
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
            next({
                message: "No kmom"
            });
            return;
        }

        const sql = "INSERT INTO reports (kmom, question, answer) VALUES (?, ?, ?)";
        db.run(sql, [kmom, question, answer], (err) => {
            if (err) {
                next(err);
                return;
            }

        });

        res.json({
            message: "Successfuly added report",
            question: question,
            answer: answer
        });
    }



    function deleteReport(req, res, next) {
        const id = req.body.id;
        const sql = "DELETE FROM reports WHERE rowID = ?";
        db.run(sql, id, (err) => {
            if (err) {
                next(err);
                return;
            }

            res.json({
                message: `Deleted report with id: ${id}`
            });
        });
    }


    return {
        getReport: getReport,
        addReport: addReport,
        deleteReport: deleteReport
    };
}());
