import { createNewWishList, updateAddWishList } from "../../helpers/index.js";
import { Products, Wishlists } from "../../models/index.js";

export const addToWishlist = async (userId, wishlistItems) => {
    try {
        const product = await Products.findById(wishlistItems.productId);
        if (!product) {
            return {
                success: false,
                message: 'Product not found',
            };
        }
        let wishList = await Wishlists.findOne({ userId });
        if (!wishList) {
            // creating new wishlist if not existing for a user
            wishList = createNewWishList(userId, wishlistItems);
        } else {
            // Update or add the product in the existing wishlist
            wishList = updateAddWishList(wishList, wishlistItems);
        }
        await wishList.save();
        return {wishList, success: true};
    } catch (error) {
        throw new Error('Error adding product: ' + error.message);
    }
}