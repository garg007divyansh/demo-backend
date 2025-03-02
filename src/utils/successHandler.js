const successHandler = (res, message, data = null) => {
    res.status(200).json({
        message,
        status: true,
        success: true,
        data,
    });
};

module.exports = successHandler