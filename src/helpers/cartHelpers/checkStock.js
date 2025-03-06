export const isStockAvailable = (product, quantity) => {
    if (quantity > product.stock) {
        return {
            success: false,
            message: `Available stock is ${product.stock}`,
        };
    }
    return { success: true };
};