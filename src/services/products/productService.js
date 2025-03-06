import { Products } from "../../models/index.js";
import { emitUpdate } from "../../utils/index.js";

export const addProduct = async (productData) => {
    try {
        const product = await new Products(productData).save();
        emitUpdate("product-added", { id: product._id, ...productData });
        return product
    } catch (error) {
        throw new Error('Error adding product: ' + error.message);
    }
}

export const getAllProducts = async (partnerId) => {
    try {
        let products
        if (partnerId) {
            products = await Products.find({partnerId})
        } else {
            products = await Products.find().populate({
                path: "partnerInfo",
                select: "name email phone",
            });
        }
        return products
    } catch (error) {
        throw new Error('Error fetching product: ' + error.message);
    }
}

export const updateProductById = async (partnerId, productId, updatedData) => {
    try {
        const findProduct = await Products.findById(productId);
        if (!findProduct) {
            return { success: false, message: 'Product not found' };
        }

        // Convert both IDs to strings for comparison
        if (findProduct.partnerId.toString() !== partnerId.toString()) {
            return { success: false, message: 'Wrong Partner Id' };
        }
        const updatedProduct = await Products.findByIdAndUpdate(productId, { $set: updatedData }, { new: true });
        emitUpdate("product-updated", { id: productId, ...updatedData });

        return {updatedProduct, success: true}
    } catch (error) {
        throw new Error('Error updating product: ' + error.message);
    }
};

export const deleteProductById = async (partnerId, productId) => {
    try {
        const findProduct = await Products.findById(productId);
        if (!findProduct) {
            return { success: false, message: 'Product not found' };
        }

        // Convert both IDs to strings for comparison
        if (findProduct.partnerId.toString() !== partnerId.toString()) {
            return { success: false, message: 'Wrong Partner Id' };
        }
        const deletedProduct = await Products.findByIdAndDelete(productId);
        emitUpdate("product-deleted", { id: productId });

        return {deletedProduct, success: true}
    } catch (error) {
        throw new Error('Error updating product: ' + error.message);
    }
};