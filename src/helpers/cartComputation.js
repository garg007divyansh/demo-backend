export const computeCartDetails = (cart) => {
    let totalPrice = 0;

    // Compute details for each product in the cart
    const cartDetails = cart.products.map((productItem) => {
        const product = productItem.productId;

        if (!product) {
            return {
                success: false,
                message: 'Product not found in the cart',
            };
        }

        const productTotalPrice = product.price * productItem.quantity;
        totalPrice += productTotalPrice;

        return {
            productId: product._id,
            name: product.name,
            price: product.price,
            quantity: productItem.quantity,
            stock: product.stock,
            image: product.image,
            productTotalPrice,
        };
    });

    return { cartDetails, totalPrice };
};