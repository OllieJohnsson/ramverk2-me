process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../app.js");

chai.should();
chai.use(chaiHttp);


describe("Index", () => {
    describe("GET /", () => {
        it("200 should return object with name: Oliver Johnsson", done => {
            chai.request(server)
                .get("/")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.name.should.equal("Oliver Johnsson");
                    done();
                });
        });
    });
});
