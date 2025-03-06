import { Carts, Products } from "../../models/index.js";

export const addToCart = async (userId, cartItems) => {
    try {
        const product = await Products.findById(cartItems.productId);
        if (!product) {
            return {
                success: false,
                message: 'Product not found',
            };
        }
        if (cartItems.quantity > product.stock) {
            return {
                success: false,
                message: `Available stock is ${product.stock}`,
            };
        }

        let cart = await Carts.findOne({ userId });
        if (!cart) {
            // Create a new cart if it doesn't exist
            cart = new Carts({
                userId,
                products: [
                    {
                        productId: cartItems.productId,
                        quantity: cartItems.quantity,
                    },
                ],
            });
        } else {
            // Check if the product already exists in the cart
            const existingProductIndex = cart.products.findIndex(
                (item) => item.productId.toString() === cartItems.productId
            );

            if (existingProductIndex > -1) {
                // Update the quantity of the existing product
                cart.products[existingProductIndex].quantity = cartItems.quantity;
            } else {
                // Add the new product to the cart
                cart.products.push({
                    productId: cartItems.productId,
                    quantity: cartItems.quantity,
                });
            }
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

        // Prepare the cart data with computations
        let totalPrice = 0;
        const cartDetails = cart.products.map((productItem) => {
            const product = productItem.productId;

            if (!product) {
                throw new Error('Product not found for an item in the cart');
            }

            const productTotalPrice = product.price * productItem.quantity;
            totalPrice = totalPrice + productTotalPrice;

            return {
                productId: product._id,
                name: product.name,
                price: product.price,
                quantity: productItem.quantity,
                stock: product.stock,
                image: product.image,
                productTotalPrice, // Price for the quantity of this product
            };
        });

        return {
            success: true,
            data: {
                userId: cart.userId,
                products: cartDetails,
                totalPrice, // Total price of all items in the cart
            },
        };
    } catch (error) {
        throw new Error('Error retrieving cart: ' + error.message);
    }
};