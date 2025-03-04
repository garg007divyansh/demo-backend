import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Users, Roles, Otps } from '../../models/index.js';
import { sendMail } from '../../utils/emailService.js';
import moment from 'moment';

export const findUserExists = async (email, phone) => {
    return await Users.findOne({ $or: [{ email }, { phone }] });
};

export const loginUser = async (userData) => {
    try {
        const user = await Users.findOne({ email: userData.email })
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
        return { user, token, success: true };
    } catch (error) {
        throw new Error('Error login user: ' + error.message);
    }
};

export const register = async (userData) => {
    try {
        const role = await Roles.findOne({ id: userData.roleId })
        if (!role) {
            return { success: false, message: 'Role not found' };
        }
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(userData.password, salt);
        const user = new Users(userData);
        await user.save();
        return { user, success: true };
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
};

export const sendOtp = async (email) => {
    try {
        const user = await Users.findOne({ email: email });
        if (!user) {
            return { success: false, message: 'User not found' };
        }

        const expiredTime = moment().utc().add(2, 'minutes').toDate();
        const otp = Math.floor(100000 + Math.random() * 900000);

        let otpData;

        // Check if OTP already exists for the user
        const existingOtp = await Otps.findOne({ userId: user._id });
        if (existingOtp) {
            // Update the existing OTP document
            existingOtp.otp = otp;
            existingOtp.verified = false;
            existingOtp.expiredTime = expiredTime;
            otpData = await existingOtp.save();
        } else {
            // Create a new OTP document
            otpData = new Otps({
                userId: user._id,
                otp,
                verified: false,
                expiredTime,
            });
            await otpData.save();
        }

        // Send OTP via email (common for both cases)
        const emailSubject = 'Your OTP Code';
        const emailText = `Dear ${user.name},\n\nYour OTP code is ${otp}. Please use this code to verify your account.\n\nThank you!`;
        await sendMail(email, emailSubject, emailText);

        return { user, otpData, success: true };
    } catch (error) {
        throw new Error('Error sending OTP: ' + error.message);
    }
};
