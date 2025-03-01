const validateUser = (data) => {
    const { name, email, phone, password } = data;

    if (!name) {
        return { isValid: false, message: 'Name is required' };
    }

    if (!email) {
        return { isValid: false, message: 'Email is required' };
    }

    if (!phone) {
        return { isValid: false, message: 'Phone number is required' };
    }

    if (!password) {
        return { isValid: false, message: 'Password is required' };
    }

    return { isValid: true };
};

module.exports = { validateUser };
