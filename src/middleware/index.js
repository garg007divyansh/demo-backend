const authenticateToken = require('./authMiddleware');
const {checkSuperAdmin} = require('./authorityMiddleware');

module.exports = { authenticateToken, checkSuperAdmin };