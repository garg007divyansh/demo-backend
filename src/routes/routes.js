const express = require('express');
const router = express.Router();
const {authController, userController, masterController} = require('../controllers/index');
const { authenticateToken, checkSuperAdmin } = require('../middleware');

//master routes
router.get('/getAllRoles', masterController.getAllRoles);

//auth routes
router.post('/loginUser', authController.loginUser);
router.post('/create-user', authController.createUser);

// user routes
router.get('/getAllUsers', [authenticateToken, checkSuperAdmin], userController.getAllUsers);
router.get('/getUserById/:id', [authenticateToken, checkSuperAdmin], userController.getUserById);
router.put('/update-user/:id', authenticateToken, userController.updateUser);
router.delete('/deleteUserById/:id', authenticateToken, userController.deleteUserById);

module.exports = router;
