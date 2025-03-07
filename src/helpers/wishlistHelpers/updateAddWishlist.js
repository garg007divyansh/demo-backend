export const updateAddWishList = (wishList, wishlistItems) => {
    const existingProductIndex = wishList.products.findIndex(
        (item) => item.productId.toString() === wishlistItems.productId
    );

    if (existingProductIndex > -1) {
        // Update the quantity of the existing product
        wishList.products[existingProductIndex].quantity = wishlistItems.quantity;
    } else {
        // Add the new product to the wishList
        wishList.products.push({
            productId: wishlistItems.productId,
        });
    }

    return wishList;
};