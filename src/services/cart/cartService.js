import { computeCartDetails, createNewCart, isStockAvailable, updateOrAddProduct } from "../../helpers/index.js";
import { Carts, Products, Users } from "../../models/index.js";

export const addToCart = async (userId, cartItems) => {
    try {
        const product = await Products.findById(cartItems.productId);
        if (!product) {
            return {
                success: false,
                message: 'Product not found',
            };
        }
        // checking stock
        const stockCheck = isStockAvailable(product, cartItems.quantity);
        if (!stockCheck.success) {
            return stockCheck;
        }

        let cart = await Carts.findOne({ userId });
        if (!cart) {
            // creating new cart if not existing for a user
            cart = createNewCart(userId, cartItems);
        } else {
            // Update or add the product in the existing cart
            cart = updateOrAddProduct(cart, cartItems);
        }
        await cart.save();
        return {cart, success: true};
    } catch (error) {
        throw new Error('Error adding product: ' + error.message);
    }
}

export const getCart = async (userId) => {
    try {
        // Fetch the cart for the user
        const cart = await Carts.findOne({ userId }).populate({
            path: 'products.productId',
            select: 'name price stock image',
        });
        if (!cart || cart.products.length === 0) {
            return {
                success: false,
                message: 'Cart is empty or not found',
            };
        }
        const { cartDetails, totalPrice } = computeCartDetails(cart); // compute the cart details using helper function
        return {
            success: true,
            data: {
                userId: cart.userId,
                products: cartDetails,
                totalPrice,
            },
        };
    } catch (error) {
        throw new Error('Error retrieving cart: ' + error.message);
    }
};