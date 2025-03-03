const checkSuperAdmin = (req, res, next) => {
    const { user } = req;
    if (user.roleId !== 1) {
        return res.status(403).json({
            message: 'Unauthorized Access',
            status: false,
            success: false,
        });
    }
    next();
};

module.exports = {
    checkSuperAdmin,
};