const express = require('express');

const { register, login, logout, userDetails } = require('../controllers/users.controllers');
const { auth } = require('../middlewares/auth');

const UserRouter = express.Router();

UserRouter.post('/register', register);
UserRouter.post('/login', login);
UserRouter.post('/logout', logout);
UserRouter.get('/me', auth, userDetails);

module.exports = UserRouter;
