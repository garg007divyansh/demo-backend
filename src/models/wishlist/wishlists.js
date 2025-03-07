import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
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
            addedAt: {
                type: Date,
                default: Date.now
            },
        }
    ],
}, { timestamps: true });

export const Wishlists = mongoose.model('wishlists', wishlistSchema);
