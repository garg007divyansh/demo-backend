const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');

const findUserExists = async (email, phone) => {
    return await User.Users.findOne({ $or: [{ email }, { phone }] });
};

const loginUser = async (userData) => {
    try {
        const user = await User.Users.findOne({email: userData.email})
        if (!user) {
            throw new Error('User not found');
        }
        // Compare password
        const isPasswordValid = await bcrypt.compare(userData.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Incorrect password');
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );
        return {user, token};
    } catch (error) {
        throw new Error('Error login user: ' + error.message);
    }
};

const createUser = async (userData) => {
    try {
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(userData.password, salt);
        const user = new User(userData); // Create a new User instance
        await user.save(); // Save the user to the database
        return user;
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
};


module.exports = {
    loginUser,
    createUser,
    findUserExists,
};