const express = require('express');
const userController  = require('../../controllers/userController');
const { createUserSchema, userIdSchema, updateUserSchema} = require('../../utils/schemas/user');
const validationHandlers = require('../../utils/middlewares/validationHandlers');

function userApi(app) { 
    const router = new express.Router();
    app.use('/api/users', router)

    router.post('/login', userController.signIn);
    router.get('/me', userController.currentUser);
    router.get('/:id', validationHandlers({ id: userIdSchema }, 'params'), userController.getUser);
    router.post('/', validationHandlers(createUserSchema), userController.createUser);
 }

module.exports = userApi;
 