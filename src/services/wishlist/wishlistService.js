import { createNewWishList, flattenProducts, updateAddWishList } from "../../helpers/index.js";
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

export const getWishlist = async (userId) => {
    try {
        // Fetch the wishlist for the user
        const wishlist = await Wishlists.findOne({ userId }).populate({
            path: 'products.productId',
            select: 'name price stock image',
        });
        if (!wishlist) {
            return {
                success: false,
                message: 'Wishlist is empty or not found',
            };
        }
        const formattedProducts = flattenProducts(wishlist.products);  // compute the wishlist details using helper function
        let data = {
            wishlistId: wishlist._id,
            userId: wishlist.userId,
            products: formattedProducts,
        }
        return {
            success: true,
            data
        };
    } catch (error) {
        throw new Error('Error retrieving wishlist: ' + error.message);
    }
};
