const Joi = require('joi');
const mongoose = require('mongoose');

const exceptionSchema = new mongoose.Schema({
    product_name: {
        type: String,
        maxlength: 20
    },
    company_name: {
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
    wallet_address: {
        type: String,
        maxlength: 100
    },
    app_location: {
        type: String
    },
    error_name: {
        type: String,
        maxlength: 60
    },
    error_message: {
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
        product_name: Joi.string().max(20).required(),
        company_name: Joi.string().max(50).required(),
        version: Joi.string().max(10).required(),
        platform: Joi.string().max(10).required(),
        process_type: Joi.string().max(20).required(),
        wallet_address: Joi.string().max(100).required(),
        app_location: Joi.string(),
        error_name: Joi.string().max(60).required(),
        error_message: Joi.string().required(),
    };
    return Joi.validate(logger, schema);
}

const ModelException = mongoose.model('ModelException', exceptionSchema);

exports.ModelException = ModelException;
exports.validate = validateException;