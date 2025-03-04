import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Users, Roles } from '../../models/index.js';

export const findUserExists = async (email, phone) => {
    return await Users.findOne({ $or: [{ email }, { phone }] });
};

export const loginUser = async (userData) => {
    try {
        const user = await Users.findOne({email: userData.email})
        if (!user) {
            return { success: false, message: 'User not found' };
        }
        // Compare password
        const isPasswordValid = await bcrypt.compare(userData.password, user.password);
        if (!isPasswordValid) {
            return { success: false, message: 'Incorrect password' };
        }
        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id, name: user.name, email: user.email, phone: user.phone, roleId: user.roleId },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );
        return {user, token, success: true};
    } catch (error) {
        throw new Error('Error login user: ' + error.message);
    }
};

export const register = async (userData) => {
    try {
        const role = await Roles.findOne({id: userData.roleId})
        if (!role) {
            return { success: false, message: 'Role not found' };
        }
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(userData.password, salt);
        const user = new Users(userData);
        await user.save();
        return {user, success: true};
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
};
