const express = require('express');
const router = express.Router();
const user = require('../models/user');


router.get('/users', (req, res, next) => user.getUsers(req, res, next));


router.post('/register', (req, res, next) => user.registerUser(req, res, next));


router.post('/login',
    (req, res, next) => user.getHashFromEmail(req, res, next),
    (req, res, next) => user.checkPassword(req, res, next),
    (req, res, next) => user.getToken(req, res, next),
    (req, res, next) => user.checkToken(req, res, next),
    (req, res, next) => user.displayToken(req, res, next));


module.exports = router;
