const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const exceptionRoute = require('./routes/routes.exception');
const { ModelException } = require('./models/model.exeption');
const app = express();

// Connecting to MongoDB and listen
mongoose.connect('mongodb://localhost/loger_db', { useUnifiedTopology: true, useNewUrlParser: true})
.then(() => {
   console.log('MongoDb conected ...');
    app.listen(3000, () => {
        console.log('listening on 3000');
    })
})
.catch((err) => {
    return console.log(err)
});

mongoose.set('useFindAndModify', false);
app.use(express.json());

// setting up ejs engine
app.set('view engine', 'html')

// //middleware
app.use(bodyParser.urlencoded({ extended: false }));
//
// app.use(bodyParser.json())

// folder structure
app.use(express.static('views'))

app.use(function (req, res, next) {
    console.log('Requested:',req.method, req.url);
    next();
});

app.use('/api/v1', exceptionRoute);

app.get('/', async (req, res) => {
    res.render('index.html')
})