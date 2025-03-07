import { wishlistService } from '../../services/index.js';
import { successHandler } from '../../utils/index.js';
import mongoose from 'mongoose';

export const addToWishlist = async (req, res) => {
    try {
        const userId = req.user.id
        const { wishlistItems } = req.body;

        if (!wishlistItems || wishlistItems.length === 0) {
            return res.status(400).json({
                message: 'No products provided',
                status: false,
                success: false,
            });
        }

        if (!mongoose.Types.ObjectId.isValid(wishlistItems.productId)) {
            return res.status(400).json({
                message: 'Invalid product ID',
                status: false,
                success: false,
            });
        }

        const response = await wishlistService.addToWishlist(userId, wishlistItems);
        if (!response.success) {
            return res.status(404).json({
                message: response.message,
                status: false,
                success: false,
            });
        }
        successHandler(res, 200, 'Product added to wishlist successfully', null);
    } catch (error) {
        console.error('Error adding product to wishlist:', error.message);
        res.status(500).json({
            message: 'Error adding product to wishlist',
            status: false,
            success: false,
            error: error.message
        });
    }
}

export const getWishlist = async (req, res) => {
    try {
        const userId = req.user.id
        const response = await wishlistService.getWishlist(userId);
        if (!response.success) {
            return res.status(404).json({
                message: response.message,
                status: false,
                success: false,
            });
        }
        successHandler(res, 200, 'Wishlist retrieved successfully', response.data);
    } catch (error) {
        console.error('Error fetching products to wishlist:', error.message);
        res.status(500).json({
            message: 'Error fetching products to wishlist',
            status: false,
            success: false,
            error: error.message
        });
    }
}
