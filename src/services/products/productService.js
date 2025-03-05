import { Products } from "../../models/index.js";

export const addProduct = async (productData) => {
    try {
        const product = await new Products(productData).save();
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