const errorHandler = (res, statusCode, message, error = null) => {
    res.status(statusCode).json({
        message,
        status: false,
        success: false,
        ...(error && { error }),
    });
};

module.exports = errorHandler