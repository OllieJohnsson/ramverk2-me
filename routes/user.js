const express = require('express');
const router = express.Router();
const user = require('../models/user');


router.get('/users', (req, res, next) => user.getUsers(req, res, next));


router.post('/register', (req, res, next) => user.registerUser(req, res, next));


router.post('/login',
    (req, res, next) => user.getHashFromEmail(req, next),
    (req, res, next) => user.checkPassword(req, next),
    (req, res, next) => user.getToken(req, next),
    (req, res, next) => user.checkToken(req, next),
    (req, res, next) => user.displayToken(req, res));


module.exports = router;
