import express from 'express';
import { authController, adminController, masterController, userController, productController } from '../controllers/index.js';
import { authenticateToken, checkSuperAdmin, checkPartner } from '../middleware/index.js';

const router = express.Router();

//master routes
router.get('/getAllRoles', masterController.getAllRoles);

//auth routes
router.post('/loginUser', authController.loginUser);
router.post('/register', authController.register);
router.post('/sendOtp', authController.sendOtp);
router.post('/verifyOtp', authController.verifyOtp);
router.post('/refreshToken', authController.refreshAccessToken);

// admin routes
router.get('/getAllUsers', [authenticateToken, checkSuperAdmin], adminController.getAllUsers);
router.get('/getUserById/:id', [authenticateToken, checkSuperAdmin], adminController.getUserById);
router.put('/updateUserById/:id', [authenticateToken, checkSuperAdmin], adminController.updateUserById);
router.delete('/deleteUserById/:id', [authenticateToken, checkSuperAdmin], adminController.deleteUserById);

// vendor/partner routes
router.post('/addProduct', [authenticateToken, checkPartner], productController.addProduct);
router.get('/getPartnerProducts/:partnerId', [authenticateToken, checkPartner], productController.getAllProducts);
router.put('/updateProductById/:id', [authenticateToken, checkPartner], productController.updateProductById);

//user routes customer
router.get('/getUserByToken', authenticateToken, userController.getUserByToken);
router.put('/updateUser', authenticateToken, userController.updateUser);
router.get('/getAllProducts', productController.getAllProducts);

export default router;
