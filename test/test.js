var assert = require("assert");

const express = require("express");
const router = new express.Router();
const index = require("../routes/index");




describe("Test test", function() {
    describe("Test equals", function() {
        it("should have value", function() {
            assert(index);
        });
    });
});
