const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');
const authMiddleware = require('../middleware/authMiddleware');

//auth routes
router.post('/loginUser', AuthController.loginUser);
router.post('/create-user', AuthController.createUser);

// user routes
router.get('/getAllUsers', authMiddleware, UserController.getAllUsers);
router.get('/getUserById/:id', authMiddleware, UserController.getUserById);
router.put('/update-user/:id', authMiddleware, UserController.updateUser);
router.delete('/deleteUserById/:id', authMiddleware, UserController.deleteUserById);

module.exports = router;
