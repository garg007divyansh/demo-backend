const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {authController, userController} = require('../controllers/index');

//auth routes
router.post('/loginUser', authController.loginUser);
router.post('/create-user', authController.createUser);

// user routes
router.get('/getAllUsers', authMiddleware, userController.getAllUsers);
router.get('/getUserById/:id', authMiddleware, userController.getUserById);
router.put('/update-user/:id', authMiddleware, userController.updateUser);
router.delete('/deleteUserById/:id', authMiddleware, userController.deleteUserById);

module.exports = router;
