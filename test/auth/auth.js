process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../app.js");
const db = require("../../db/database");

chai.should();
chai.use(chaiHttp);


describe("Authenticated", () => {

});
