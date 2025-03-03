const mongoose = require('mongoose');

const rolesSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
    }
});

// rolesSchema.set('toJSON', {
//     transform: (doc, ret) => {
//         delete ret.__v;
//         return ret;
//     },
// });

const Roles = mongoose.model('roles', rolesSchema);

module.exports = { Roles }