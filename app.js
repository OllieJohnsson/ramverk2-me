const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8333;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

const indexRoute = require('./routes/index.js');
const helloRoute = require('./routes/hello.js');

app.use('/', indexRoute);
app.use('/hello', helloRoute);
// This is middleware called for all routes.
// Middleware takes three parameters.
// app.use((req, res, next) => {
//     console.log(req.method);
//     console.log(req.path);
//     next();
// });


// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}


// Testing routes with method
app.get("/user", (req, res) => {
    res.json({
        data: {
            msg: "Got a GET request"
        }
    });
});

app.post("/user", (req, res) => {
    res.status(201).json({
        data: {
            msg: "Got a POST request"
        }
    });
});

app.put("/user", (req, res) => {
    // res.json({
    //     data: {
    //         msg: "Got a PUT request"
    //     }
    // });
    res.status(204).send();
});

app.delete("/user", (req, res) => {
    // res.json({
    //     data: {
    //         msg: "Got a DELETE request"
    //     }
    // });
    res.status(204).send();
});




// Add routes for 404 and error handling
// Catch 404 and forward to error handler
// Put this last
app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});


app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title":  err.message,
                "detail": err.message
            }
        ]
    });
});

app.listen(port, () => {
    console.log(`Example API listening on port ${port}!`);
})
