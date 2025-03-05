import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },
    partnerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users',
    },
}, { timestamps: true, id: false, });

productSchema.virtual("partnerInfo", {
    ref: "users",              // Reference the 'users' collection
    localField: "partnerId",   // Field in the Product schema (foreign key)
    foreignField: "_id",       // Field in the User schema (primary key)
    justOne: true,             // Return a single object instead of an array
});

productSchema.set('toJSON', {
    virtuals: true, 
    transform: (doc, ret) => {
        delete ret.__v;
        if (ret.partnerInfo) {
            delete ret.partnerInfo._id;
        }
        return ret;
    },
});

export const Products = mongoose.model('products', productSchema);