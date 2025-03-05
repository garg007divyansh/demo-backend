// import jwt from 'jsonwebtoken';

// export const token = jwt.sign(
//     { id: user._id, name: user.name, email: user.email, phone: user.phone, roleId: user.roleId },
//     process.env.JWT_SECRET_KEY,
//     { expiresIn: '1h' }
// );

import jwt from 'jsonwebtoken';

export const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
};

export const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '7d' }); // Refresh token valid for 7 days
};

export const verifyToken = (token, secretKey) => {
    return jwt.verify(token, secretKey);
};