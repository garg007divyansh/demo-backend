const User = require('../models/Users');
const bcrypt = require('bcryptjs');

const loginUser = async (userData) => {
    try {
        const user = await User.findOne({email: userData.email})
        if (!user) {
            throw new Error('User not found');
        }
        // Compare password
        const isPasswordValid = await bcrypt.compare(userData.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Incorrect password');
        }
        return user;
    } catch (error) {
        throw new Error('Error login user: ' + error.message);
    }
};

module.exports = {
    loginUser,
};