process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../app.js");
const db = require("../../db/database");

chai.should();
chai.use(chaiHttp);


describe("Users", () => {

    let token;

    before(() => {
        db.run("DELETE FROM users", (err) => {
            if (err) {
                console.log("Could not empty test DB users", err.message);
            }
        });
    });

    describe("GET /users", () => {
        const message = "No users yet";
        it(`200 should return a message: ${message}`, (done) => {
            chai.request(server)
                .get("/users")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.message.should.equal(message);
                    done();
                });
        });
    });






});
