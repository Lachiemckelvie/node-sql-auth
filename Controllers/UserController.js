const express = require('express');
const router = express.Router();
const userService = require('../Services/User');
const authorise = require('../Middleware/Authorise'); 

// Post requests
router.post('/register', register);
router.post('/auth', authenticate);

// Get requests
router.get('/all', authorise(), all);
router.get('/byId',authorise(), byId);

// Put requests 
router.put('/update', authorise(), update);

module.exports = router;

// Retrieve all users
function all(req, res, next) {
    userService.getAll(req.body)
    .then((users) => res.json(users))
    .catch(next);
}

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}

// Retrieve user by ID
function byId(req, res, next) {
    userService.getById(req.body.id)
    .then((user) => res.json(user))
    .catch(next);
}

// Create a new user
function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({ 
            message: 'Registration successful' }
        ))
        .catch(next);
}

function update(req, res, next) {
    userService.update(req.body)
        .then((user) => res.json(user))
        .catch(next)
}