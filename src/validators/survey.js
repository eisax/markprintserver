const Joi = require('joi');
const validatorHandler = require('../middlewares/validatorHandler');


const survey = (req, res, next) => {
    const schema = Joi.object().keys({
        title: Joi.string()
            .trim()
            .required()
    });
    validatorHandler(req, res, next, schema);
};

const question = (req, res, next) => {
    const schema = Joi.object().keys({
        title: Joi.string()
            .trim()
            .required()
    });
    validatorHandler(req, res, next, schema);
};

module.exports = {
    survey,
    question
};