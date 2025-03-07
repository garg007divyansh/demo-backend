import { Wishlists } from "../../models/index.js";

export const createNewWishList = (userId, wishlistItems) => {
    return new Wishlists({
        userId,
        products: [
            {
                productId: wishlistItems.productId,
            },
        ],
    });
};