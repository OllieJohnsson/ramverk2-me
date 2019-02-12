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
        db.run("DELETE FROM reports", (err) => {
            if (err) {
                console.log("Could not empty test DB reports", err.message);
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


    describe("POST /register", () => {
        const successMessage = "Successfully registered user with email oliver@me.com";
        const failMessage = "User with email oliver@me.com is already registered";
        it(`200 should register user and return message: "${successMessage}"`, (done) => {
            const user = {
                email: "oliver@me.com",
                password: "1234"
            };
            chai.request(server)
                .post("/register")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.message.should.equal(successMessage);
                    done();
                });
        });




        it(`500 should fail to register with message: "${failMessage}"`, (done) => {
            const user = {
                email: "oliver@me.com",
                password: "1234"
            };
            chai.request(server)
                .post("/register")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.errors[0].detail.should.equal(failMessage);
                    done();
                });
        });
    });






    describe("GET /users", () => {
        const email = "oliver@me.com";
        it(`200 should return list of users including user with email "${email}"`, (done) => {
            chai.request(server)
                .get("/users")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("array");
                    res.body[0].email.should.equal(email);
                    done();
                });
        });
    });



    describe("POST /login", () => {
        const successMessage = "Successfully logged in oliver@me.com";


        it(`401 should fail to login because email was not registered`, (done) => {
            const user = {
                email: "wrong@me.com",
                password: "1234"
            };
            chai.request(server)
                .post("/login")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    res.body.errors[0].detail.should.equal("A user with the email address wrong@me.com is not in the database");
                    done();
                });
        });

        it(`401 should fail to login because wrong password was provided`, (done) => {
            const user = {
                email: "oliver@me.com",
                password: "123"
            };
            chai.request(server)
                .post("/login")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    res.body.errors[0].detail.should.equal("You typed in the wrong email address or password");
                    done();
                });
        });


        it(`200 should return token and message: ${successMessage}`, (done) => {
            const user = {
                email: "oliver@me.com",
                password: "1234"
            };
            chai.request(server)
                .post("/login")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.token.should.be.a("string");
                    res.body.message.should.equal(successMessage);
                    this.token = res.body.token;
                    done();
                });
        });
    });



    describe("POST /reports", () => {
        it("401 should fail to post a report because token was not provided", done => {
            const report = {
                kmom: "01",
                question: "Fråga?",
                answer: "Svar!"
            };
            chai.request(server)
                .post("/reports")
                .send(report)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    res.body.errors[0].detail.message.should.equal("jwt must be provided");
                    done();
                });
        });


        it("200 should post a report", done => {
            const report = {
                kmom: "01",
                question: "Fråga?",
                answer: "Svar!"
            };
            chai.request(server)
                .post("/reports")
                .set('x-access-token', this.token)
                .send(report)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.message.should.equal("Successfully added report to kmom 01");
                    done();
                });
        });



        it("200 should fail to post report beacuse question already exists in kmom", done => {
            const report = {
                kmom: "01",
                question: "Fråga?",
                answer: "Annat Svar!"
            };
            chai.request(server)
                .post("/reports")
                .set('x-access-token', this.token)
                .send(report)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.an("object");
                    res.body.errors[0].detail.should.equal(`Question "Fråga?" already added for kmom 01`);
                    done();
                });
        });
    });

});
