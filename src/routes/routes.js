const express = require('express');
const router = express.Router();
const {authController, userController, masterController} = require('../controllers/index');
const { authenticateToken, checkSuperAdmin } = require('../middleware');

//master routes
router.get('/getAllRoles', masterController.getAllRoles);

//auth routes
router.post('/loginUser', authController.loginUser);
router.post('/create-user', authController.createUser);

// admin routes
router.get('/getAllUsers', [authenticateToken, checkSuperAdmin], userController.getAllUsers);
router.get('/getUserById/:id', [authenticateToken, checkSuperAdmin], userController.getUserById);
router.put('/update-user/:id', [authenticateToken, checkSuperAdmin], userController.updateUser);
router.delete('/deleteUserById/:id', [authenticateToken, checkSuperAdmin], userController.deleteUserById);

//user routes
//get uerby token, update user by toiken

module.exports = router;
