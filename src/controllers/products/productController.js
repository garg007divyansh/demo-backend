import { productService } from '../../services/index.js';
import { successHandler } from '../../utils/index.js';
import { validateAddProduct } from '../../validations/index.js';
import mongoose from 'mongoose';

export const addProduct = async (req, res) => {
    try {
        const partnerId = req.user.id;
        const { name, description, price, image, category, brand, stock } = req.body;

        const validation = validateAddProduct(req.body);
        if (!validation.isValid) {
            return res.status(400).json({
                message: validation.message,
                status: false,
                success: false,
            });
        }

        const response = await productService.addProduct({ partnerId, name, description, price, image, category, brand, stock });
        successHandler(res, 200, 'Product added successfully', null);
    } catch (error) {
        console.error('Error adding product:', error.message);
        res.status(500).json({
            message: 'Error adding product',
            status: false,
            success: false,
            error: error.message
        });
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const { id } = req.user || {};
        const { partnerId } = req.params
        if (partnerId) {
            if (id !== partnerId) {
                return res.status(400).json({
                    message: 'Invalid partner ID',
                    status: false,
                    success: false,
                });
            }
        }
        const response = await productService.getAllProducts(partnerId);
        successHandler(res, 200, 'Products retrieved successfully', response);
    } catch (error) {
        console.error('Error fetching product:', error.message);
        res.status(500).json({
            message: 'Error fetching product',
            status: false,
            success: false,
            error: error.message
        });
    }
}

export const updateProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, image, category, brand, stock } = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid product ID',
                status: false,
                success: false,
            });
        }
        const response = await productService.updateProductById(id, { name, description, price, image, category, brand, stock });
        if (!response) {
            return res.status(404).json({
                message: 'Product not found',
                status: false,
                success: false,
            });
        }
        successHandler(res, 200, 'Product updated successfully', response);
    } catch (error) {
        console.error('Error updated product:', error.message);
        res.status(500).json({
            message: 'Error updated product',
            status: false,
            success: false,
            error: error.message
        });
    }
}