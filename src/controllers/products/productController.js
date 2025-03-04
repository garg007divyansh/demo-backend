import { productService } from '../../services/index.js';
import { successHandler } from '../../utils/index.js';
import { validateAddProduct } from '../../validations/index.js';

export const addProduct = async (req, res) => {
    try {
        const { name, description, price, image, category, brand, stock } = req.body;

        const validation = validateAddProduct(req.body);
        if (!validation.isValid) {
            return res.status(400).json({
                message: validation.message,
                status: false,
                success: false,
            });
        }

        const response = await productService.addProduct({ name, description, price, image, category, brand, stock });
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
        const response = await productService.getAllProducts();
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