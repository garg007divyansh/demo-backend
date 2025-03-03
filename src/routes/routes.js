const express = require('express');
const router = express.Router();
const {authController, adminController, masterController} = require('../controllers/index');
const { authenticateToken, checkSuperAdmin } = require('../middleware');

//master routes
router.get('/getAllRoles', masterController.getAllRoles);

//auth routes
router.post('/loginUser', authController.loginUser);
router.post('/create-user', authController.createUser);

// admin routes
router.get('/getAllUsers', [authenticateToken, checkSuperAdmin], adminController.getAllUsers);
router.get('/getUserById/:id', [authenticateToken, checkSuperAdmin], adminController.getUserById);
router.put('/update-user/:id', [authenticateToken, checkSuperAdmin], adminController.updateUser);
router.delete('/deleteUserById/:id', [authenticateToken, checkSuperAdmin], adminController.deleteUserById);

//user routes
//get uerby token, update user by toiken

module.exports = router;
