process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../app.js");
const db = require("../../db/database");

chai.should();
chai.use(chaiHttp);

function testReportLength(kmom, numberOfReports) {
    chai.request(server)
        .get(`/reports/${kmom}`)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an("object");
            res.body.data.should.be.an("array");

            if(numberOfReports > 0) {
                return res.body.data.length.should.be.above(0);
            }
            res.body.data.length.should.be.equal(numberOfReports);
        });
}



describe("Reports", () => {

    before(() => {
        db.run("DELETE FROM reports", (err) => {
            if (err) {
                console.log("Could not empty test DB reports", err.message);
            }
        });

        const sql = "INSERT INTO reports (kmom, question, answer) VALUES (?, ?, ?)";
        db.run(sql, ["01", "Fråga?", "Svar!"], (err) => {
            if (err) {
                console.log(err.message);
            }
        });
    });


    describe("GET /reports/kmom01", () => {
        it("200 kmom01 should have 1 question/answer", (done) => {
            testReportLength("kmom01", 1);
            done();
        });
    });

    describe("GET /reports/kmom02", () => {
        it("200 kmom02 should have 0 question/answer", (done) => {
            testReportLength("kmom02", 0);
            done();
        });
    });

    describe("GET /reports/hej", () => {
        it("400 should return page not found", (done) => {
            chai.request(server)
                .get("/reports/hej")
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.errors.should.be.an("array");
                    done();
                });
        });
    });



});
