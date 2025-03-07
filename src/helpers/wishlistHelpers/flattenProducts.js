export const flattenProducts = (products) => {
    return products.map((item) => ({
        productId: item.productId._id, // Include only the ID as productId
        name: item.productId.name,
        price: item.productId.price,
        image: item.productId.image,
        stock: item.productId.stock,
        addedAt: item.addedAt,
        _id: item._id, // Wishlist product ID
    }));
};