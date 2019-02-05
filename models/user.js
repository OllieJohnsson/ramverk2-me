const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10;



module.exports = (function () {

    function getUsers(req, res, next) {
        const sql = "SELECT * FROM users";
        db.all(sql, (err, rows) => {
            if (err) {
                return next(err);
            }
            if (rows.length === 0) {
                return res.json({
                    message: "No users yet"
                });
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
                    switch (err.errno) {
                        case 19:
                            err.message = `User with email ${email} is already registered`;
                            break;
                    }
                    return next(err);
                }
                res.json({
                    message: `Successfully registered user with email ${email}`
                });
            });
        });
    }


    function getHashFromEmail(req, next) {
        const email = req.body.email;
        const sql = "SELECT * FROM users WHERE email = ?";
        db.get(sql, email, (err, row) => {
            if (!row) {
                return next({
                    status: 401,
                    title: "Unknown email address",
                    message: `A user with the email address ${email} is not in the database`
                });
            }
            req.body.hash = row.password;
            next();
        });
    }


    function checkPassword(req, next) {
        const email = req.body.email;
        const password = req.body.password;
        const hash = req.body.hash;

        bcrypt.compare(password, hash).then(function(result) {
            if(!result) {
                return next({
                    status: 401,
                    title: "Unauthorized",
                    message: "You typed in the wrong email address or password"
                });
            }
            req.body.payload = { email: email };
            next();
        });
    }


    function getToken(req, next) {
        const payload = req.body.payload;
        const secret = process.env.JWT_SECRET;
        const token = jwt.sign(payload, secret, { expiresIn: '1h'});

        req.headers['x-access-token'] = token;
        next();
    }


    function checkToken(req, next) {
        const token = req.headers['x-access-token'];
        const secret = process.env.JWT_SECRET;

        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                return next({
                    status: 401,
                    title: "JWT Error",
                    message: err
                });
            }
            next();
        });
    }


    function displayToken(req, res) {
        const token = req.headers['x-access-token'];
        const email = req.body.email;
        res.json({
            message: `Successfully logged in ${email}`,
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
