import { cartService } from '../../services/index.js';
import { successHandler } from '../../utils/index.js';

export const addToCart = async (req, res) => {
    try {
        const userId = req.user.id
        const { cartItems } = req.body;

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({
                message: 'No products provided',
                status: false,
                success: false,
            });
        }

        const response = await cartService.addToCart(userId, cartItems);
        if (!response.success) {
            return res.status(404).json({
                message: response.message,
                status: false,
                success: false,
            });
        }
        successHandler(res, 200, 'Product added to cart successfully', null);
    } catch (error) {
        console.error('Error adding product to cart:', error.message);
        res.status(500).json({
            message: 'Error adding product to cart',
            status: false,
            success: false,
            error: error.message
        });
    }
}

export const getCart = async (req, res) => {
    try {
        const userId = req.user.id
        const response = await cartService.getCart(userId);
        if (!response.success) {
            return res.status(404).json({
                message: response.message,
                status: false,
                success: false,
            });
        }
        successHandler(res, 200, 'Cart retrieved successfully', response.data);
    } catch (error) {
        console.error('Error fetching products to cart:', error.message);
        res.status(500).json({
            message: 'Error fetching products to cart',
            status: false,
            success: false,
            error: error.message
        });
    }
}

export const deleteCart = async (req, res) => {
    try {
        const userId = req.user.id
        const { productId } = req.body;
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                message: 'Invalid product ID',
                status: false,
                success: false,
            });
        }
        const response = await cartService.deleteCart(userId, productId);
        if (!response.success) {
            return res.status(404).json({
                message: response.message,
                status: false,
                success: false,
            });
        }
        successHandler(res, 200, response.message, null);
    } catch (error) {
        console.error('Error deleting products in cart:', error.message);
        res.status(500).json({
            message: 'Error deleting products in cart',
            status: false,
            success: false,
            error: error.message
        });
    }
}