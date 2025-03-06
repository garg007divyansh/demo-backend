import mongoose from 'mongoose';

const cartsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users',
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
                required: true,
            },
            // quantity: {
            //     type: Number,
            //     required: true,
            //     default: 0,
            // },
        }
    ],
    // totalPrice: {
    //     type: Number,
    //     required: true,
    //     default: 0,
    // },
}, {timestamps: true});

export const Carts = mongoose.model('carts', cartsSchema);
