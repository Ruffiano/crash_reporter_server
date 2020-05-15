const Joi = require('joi');
const mongoose = require('mongoose');

const exceptionSchema = new mongoose.Schema({
    productName: {
        type: String,
        maxlength: 20
    },
    companyName: {
        type: String,
        maxlength: 50
    },
    version: {
        type: String,
        maxlength: 10
    },
    platform: {
        type: String,
        maxlength: 10
    },
    process_type: {
        type: String,
        maxlength: 20
    },
    ver: {
        type: String,
        maxlength: 10
    },
    node_uid: {
        type: String,
        maxlength: 100
    },
    appLocation: {
        type: String
    },
    error_name: {
        type: String,
        maxlength: 60
    },
    error_message: {
        type: String
    },
    error_stack: {
        type: String
    },
    error_date: {
        type: String,
        maxlength: 20
    }
});

function validateException(logger) {
    console.log('>>validateException: ', logger);
    const schema = {
        productName: Joi.string().max(20).required(),
        companyName: Joi.string().max(50).required(),
        version: Joi.string().max(10).required(),
        platform: Joi.string().max(10).required(),
        process_type: Joi.string().max(20).required(),
        ver: Joi.string().max(10).required(),
        node_uid: Joi.string().max(100).required(),
        appLocation: Joi.string(),
        error_name: Joi.string().max(60).required(),
        error_message: Joi.string().required(),
        error_stack: Joi.string()
    };
    return Joi.validate(logger, schema);
}

const ModelException = mongoose.model('ModelException', exceptionSchema);

exports.ModelException = ModelException;
exports.validate = validateException;