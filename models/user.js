const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;



module.exports = (function () {

    function getUsers(req, res, next) {
        const sql = "SELECT * FROM users";
        db.all(sql, (err, rows) => {
            if (err) {
                res.json(err);
                return;
            }
            if (rows.length === 0) {
                res.json({
                    message: "No users yet"
                });
                return;
            }
            res.json(rows);
        });
    }


    function registerUser(req, res, next) {
        const email = req.body.email;
        const password = req.body.password;

        bcrypt.hash(password, saltRounds).then((hash) => {
            db.run("INSERT INTO users (email, password) VALUES (?, ?)",
            email,
            hash, (err, row) => {
                if (err) {
                    err.status = 500;
                    err.title = "Failed registering user";
                    next(err);
                    return;
                }
                res.json({
                    message: `Successfuly registered user with email: ${email}`
                });
            });
        });
    }


    function getHashFromEmail(req, res, next) {
        const email = req.body.email;
        const sql = "SELECT * FROM users WHERE email = ?";
        db.get(sql, email, (err, row) => {
            if (!row) {
                next({
                    status: 500,
                    title: "Unknown email",
                    message: `Email ${email} is not in the database`
                });
                return;
            }
            req.body.hash = row.password;
            next();
        });
    }


    function checkPassword(req, res, next) {
        const email = req.body.email;
        const password = req.body.password;
        const hash = req.body.hash;

        bcrypt.compare(password, hash).then(function(result) {
            if(!result) {
                next({
                    status: 500,
                    title: "Wrong email or password"
                });
                return;
            }
            req.body.payload = { email: email };
            next();
        });
    }


    function getToken(req, res, next) {
        const payload = req.body.payload;
        const secret = process.env.JWT_SECRET;
        const token = jwt.sign(payload, secret, { expiresIn: '1h'});

        req.headers['x-access-token'] = token;
        next();
    }


    function checkToken(req, res, next) {
        const token = req.headers['x-access-token'];
        const secret = process.env.JWT_SECRET;

        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                next(err);
                return;
            }
            next();
        });
    }


    function displayToken(req, res, next) {
        const token = req.headers['x-access-token'];
        res.json({
            token: token
        });
    }



    return {
        getUsers: getUsers,
        registerUser: registerUser,
        getHashFromEmail: getHashFromEmail,
        checkPassword: checkPassword,
        getToken: getToken,
        checkToken: checkToken,
        displayToken: displayToken
    };
}());
