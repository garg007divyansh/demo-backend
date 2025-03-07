import { Carts } from "../../models/index.js";

export const createNewCart = (userId, cartItems) => {
    return new Carts({
        userId,
        products: [
            {
                productId: cartItems.productId,
                quantity: cartItems.quantity,
            },
        ],
    });
};