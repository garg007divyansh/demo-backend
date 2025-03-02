const express = require('express');
const router = express.Router();
const {authController, userController} = require('../controllers/index');
const { authenticateToken } = require('../middleware');

//auth routes
router.post('/loginUser', authController.loginUser);
router.post('/create-user', authController.createUser);

// user routes
router.get('/getAllUsers', authenticateToken, userController.getAllUsers);
router.get('/getUserById/:id', authenticateToken, userController.getUserById);
router.put('/update-user/:id', authenticateToken, userController.updateUser);
router.delete('/deleteUserById/:id', authenticateToken, userController.deleteUserById);

module.exports = router;
