import { Products } from "../../models/index.js";

export const addProduct = async (productData) => {
    try {
        const product = await new Products(productData).save();
        return product
    } catch (error) {
        throw new Error('Error adding product: ' + error.message);
    }
}