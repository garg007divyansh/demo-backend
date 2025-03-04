import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    roleId: {
        type: Number,
        // ref: 'roles',
        required: true,
    },
});

userSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password;
        delete ret.__v;
        return ret;
    },
});

export const Users = mongoose.model('users', userSchema);
