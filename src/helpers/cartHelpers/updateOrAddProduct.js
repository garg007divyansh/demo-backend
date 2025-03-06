export const updateOrAddProduct = (cart, cartItems) => {
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

    return cart;
};