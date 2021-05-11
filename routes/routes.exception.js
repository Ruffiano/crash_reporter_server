const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const moment = require('moment');
const writeFile = require('write-file');
const path = require('path');
const http = require('http');
const router = express.Router();
const { ModelException, validate } = require('../models/model.exeption');
const { REPL_MODE_STRICT } = require('repl');

const crashesPath = path.join(__dirname, 'crashes');
const exceptionsPath = path.join(__dirname, 'uncaughtexceptions');

const upload = multer({
    dest: crashesPath,
}).single('upload_file_minidump');

router.post('/crashreports', upload, (request, response) => {
    //...
});


// router.post('/uncaughtexceptions', (request, response) => {
//     let time_based = new moment().format('YYYY-MM-DD_HH-m-s');
//     console.log('time_based: ', time_based, typeof time_based);
//     const filePath = path.join(exceptionsPath, `${time_based}.json`);
//     console.log('filePath: ', filePath);
//     const report = JSON.stringify({
//         ...request.body,
//         date: new moment().format('YYYY-MM-DD HH:m:s')
//     });
//
//     writeFile(filePath, report, error => {
//         if (error) return console.error('Error Saving', report);
//         console.log('Exception Saved', filePath, report);
//     });
//     response.end();
// });


router.post('/uncaughtexceptions', async (req, res) => {
    const { error } = validate(req.body);
    if (error)
        console.log('>> Error: ', error)

    const _report = JSON.stringify({
        ...req.body,
        date: new moment().format('YYYY-MM-DD HH:m:s')
    });
    const report = JSON.parse(_report);

    // console.log('>> Test parse:', report.error[name])
    let set_exception = new ModelException({
        product_name: report.product_name,
        company_name: report.company_name,
        version: report.version,
        platform: report.platform,
        process_type: report.process_type,
        wallet_address: report.wallet_address,
        app_location: report.app_location,
        error_name: report.error_name,
        error_message: report.error_message,
        error_date: report.date,
    });
    set_exception = await set_exception.save();
    console.log('response: ', set_exception)
    res.end();
});

router.post('/log', async (req, res) => {
    const { error } = validate(req.body);
    if (error)
        console.log('>> Error: ', error)

    const _report = JSON.stringify({
        ...req.body,
        date: new moment().format('YYYY-MM-DD HH:m:s')
    });
    const report = JSON.parse(_report);

    let set_exception = new ModelException({
        product_name: report.product_name,
        company_name: report.company_name,
        version: report.version,
        platform: report.platform,
        process_type: report.process_type,
        wallet_address: report.wallet_address,
        app_location: report.app_location,
        error_name: report.error_name,
        error_message: report.error_message,
        error_date: report.date,
    });
    set_exception = await set_exception.save();
    console.log('response: ', set_exception)
    res.end();
});


router.get('/get_log', async (request, response) => {
    await ModelException.find({}).sort({'error_date':-1}).exec(function(err, result) {
        console.log('response: ', result)
        response.status(200).send(result);
    });
});

router.get('/:id', async (request, response) => {
    const result = await ModelException.findById(request.params.id);
    response.status(200).send(result);
});

module.exports = router;