const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const moment = require('moment');
const writeFile = require('write-file');
const path = require('path');
const http = require('http');

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));

const crashesPath = path.join(__dirname, 'crashes');
const exceptionsPath = path.join(__dirname, 'uncaughtexceptions');

const upload = multer({
    dest: crashesPath,
}).single('upload_file_minidump');

app.post('/crashreports', upload, (request, response) => {
    // ...
});


app.post('/log', upload, (request, response) => {
    const report = JSON.stringify({
        ...request.body,
        date: new moment().format('YYYY-MM-DD HH:m:s')
    });
    console.log('>> >> report: ', report);
    response.end();
});

app.post('/uncaughtexceptions', (request, response) => {
    let time_based = new moment().format('YYYY-MM-DD_HH-m-s');
    console.log('time_based: ', time_based, typeof time_based);
    const filePath = path.join(exceptionsPath, `${time_based}.json`);
    console.log('filePath: ', filePath);
    const report = JSON.stringify({
        ...request.body,
        date: new moment().format('YYYY-MM-DD HH:m:s')
    });

    writeFile(filePath, report, error => {
        if (error) return console.error('Error Saving', report);
        console.log('Exception Saved', filePath, report);
    });
    response.end();
});

server.listen(3000, () => {
    console.log('Crash report server running on Port 3000.');
});
