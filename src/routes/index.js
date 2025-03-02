const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');

// Define routes and map them to controller methods
router.get('/getAllUsers', UserController.getAllUsers); // Use GET for fetching all user
router.get('/getUserById/:id', UserController.getUserById); // Use GET for fetching user by id
router.post('/create-user', UserController.createUser); // Use POST for creating a user
router.put('/update-user/:id', UserController.updateUser); // Use UPDATE for update user by id
router.delete('/deleteUserById/:id', UserController.deleteUserById); // Use DELETE for deleting a user
router.post('/loginUser', AuthController.loginUser); // Use post for logged in a user

module.exports = router;
