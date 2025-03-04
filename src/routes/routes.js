import express from 'express';
import { authController, adminController, masterController, userController, productController } from '../controllers/index.js';
import { authenticateToken, checkSuperAdmin } from '../middleware/index.js';

const router = express.Router();

//master routes
router.get('/getAllRoles', masterController.getAllRoles);

//auth routes
router.post('/loginUser', authController.loginUser);
router.post('/register', authController.register);
router.post('/sendOtp', authController.sendOtp);
router.post('/verifyOtp', authController.verifyOtp);

// admin routes
router.get('/getAllUsers', [authenticateToken, checkSuperAdmin], adminController.getAllUsers);
router.get('/getUserById/:id', [authenticateToken, checkSuperAdmin], adminController.getUserById);
router.put('/updateUserById/:id', [authenticateToken, checkSuperAdmin], adminController.updateUserById);
router.delete('/deleteUserById/:id', [authenticateToken, checkSuperAdmin], adminController.deleteUserById);

//user routes
router.get('/getUserByToken', authenticateToken, userController.getUserByToken);
router.put('/updateUser', authenticateToken, userController.updateUser);

//product routes
router.post('/addProduct', authenticateToken, productController.addProduct);

export default router;
