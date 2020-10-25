const joi = require('@hapi/joi');
const { ObjectId } = require('mongodb')

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const userNameSchema = joi.string().max(80);
const userEmailSchema = joi.string().email();
const userPasswordSchema = joi.string().min(8).max(40);

const createUserSchema = {
    name: userNameSchema.required(),
    email: userEmailSchema.required(),
    password: userPasswordSchema.required(),
};

const signInSchema = {
    email: userEmailSchema.required(),
    password: userPasswordSchema.required(),
};

const updateUserSchema = {
    name: userNameSchema,
    email: userEmailSchema,
    password: userPasswordSchema,
};

module.exports = {
    userIdSchema,
    signInSchema,
    createUserSchema,
    updateUserSchema
}