import mongoose from 'mongoose';

const rolesSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
});

// Uncomment this if you want to transform the output when converting to JSON
// rolesSchema.set('toJSON', {
//     transform: (doc, ret) => {
//         delete ret.__v;
//         return ret;
//     },
// });

export const Roles = mongoose.model('roles', rolesSchema);
