const express = require('express');
const api = express.Router();

const UserController = require('../controllers/users');


api.post('/signup', UserController.saveUser);
api.post('/login', UserController.login);