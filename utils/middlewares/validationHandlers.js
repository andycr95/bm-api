const boom = require('@hapi/boom');
const joi = require('@hapi/joi');

function validate(data, schema) {
    const { error } = joi.object(schema).validate(data)
    return error;
}

function validationHandlers(schema, check = "body") {
    return function (req, res, next) { 
        const error = validate(req[check], schema);

        error ? res.json(boom.badData(error)) : next();
     }
}

module.exports = validationHandlers;