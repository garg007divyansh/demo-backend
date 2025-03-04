import mongoose from 'mongoose';

const otpsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // ref: 'Users',
    },
    otp: {
        type: Number,
        required: true,
        unique: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    expiredTime: {
        type: Date,
        required: true,
    }
});

export const Otps = mongoose.model('otps', otpsSchema);
