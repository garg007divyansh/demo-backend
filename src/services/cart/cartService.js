import { Carts, Products } from "../../models/index.js";

export const addToCart = async (userId, cartItems) => {
    try {
        let cart = await Carts.findOne({ userId });
        if (!cart) {
            cart = new Carts({ userId, products: [], totalPrice: 0 });
        }
        for (const { productId, quantity } of cartItems) {
            const product = await Products.findById(productId);
            if (!product) {
                return { success: false, message: `Product with ID ${productId} not found` };
            }
            const itemIndex = cart.products.findIndex(item => item.productId.toString() === productId);
            console.log(itemIndex, 'itemIndex')
            if (itemIndex > -1) {
                cart.products[itemIndex].quantity += quantity; //update quantity
            } else {
                cart.products.push({ productId, quantity }); // add new product
            }
            cart.totalPrice += product.price * quantity; // making total price
        }
        // await cart.save();
        return {cart, success: true};
    } catch (error) {
        throw new Error('Error adding product: ' + error.message);
    }
}