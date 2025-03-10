import express from 'express';
import { authController, adminController, masterController, userController, productController, cartController, wishlistController, paymentController } from '../controllers/index.js';
import { authenticateToken, checkSuperAdmin, checkPartner } from '../middleware/index.js';
import { emitUpdate } from '../utils/index.js';

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
router.delete('/deleteProductById/:id', [authenticateToken, checkPartner], productController.deleteProductById);

//user routes customer
router.get('/getUserByToken', authenticateToken, userController.getUserByToken);
router.put('/updateUser', authenticateToken, userController.updateUser);
router.get('/getAllProducts', productController.getAllProducts);
router.post('/addToCart', authenticateToken, cartController.addToCart);
router.get('/getCart', authenticateToken, cartController.getCart);
router.delete('/deleteCartItem', authenticateToken, cartController.deleteCart);
router.post('/addToWishlist', authenticateToken, wishlistController.addToWishlist);
router.get('/getWishlist', authenticateToken, wishlistController.getWishlist);
router.delete('/deleteWishlist', authenticateToken, wishlistController.deleteWishlist);
router.post('/create-payment-intent', authenticateToken, paymentController.createPaymentIntent);

// Test route for emitting socket events
router.get("/test-socket", (req, res) => {
    try {
        const testEvent = {
            message: "Socket.IO is working!",
            timestamp: new Date(),
        };
        emitUpdate("test-event", testEvent);
        res.status(200).send("Socket event emitted successfully!");
    } catch (error) {
        console.error("Error emitting test event:", error);
        res.status(500).send("Failed to emit socket event.");
    }
});

export default router;
