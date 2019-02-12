const express = require("express");
const router = new express.Router();
const user = require("../src/users/user");


router.get("/users", (req, res, next) => user.getUsers(req, res, next));


router.post("/register", (req, res, next) => user.registerUser(req, res, next));


router.post("/login",
    (req, res, next) => user.getHashFromEmail(req, next),
    (req, res, next) => user.checkPassword(req, next),
    (req, res, next) => user.getToken(req, next),
    (req, res, next) => user.checkToken(req, next),
    (req, res, next) => user.displayToken(req, res));

router.get("/isLoggedIn",
    (req, res, next) => user.checkToken(req, next),
    (req, res, next) => res.json({status: true}));


module.exports = router;
