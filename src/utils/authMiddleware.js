const { decode: verifyToken } = require('./token');
const { logger } = require('./logger');
const User = require('../models/user.model');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send({
            status: 'error',
            message: 'Token is required'
        });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        logger.error('Invalid token');
        return res.status(401).send({
            status: 'error',
            message: 'Invalid token'
        });
    }

    User.findByToken(token, (err, user) => {
        if (err) {
            logger.error(err.message);
            return res.status(401).send({
                status: 'error',
                message: "Session Expired, log in again"
            });
        }

        if (!user) {
            return res.status(401).send({
                status: 'error',
                message: 'User not found'
            });
        }
        
        req.user = user;
        next()
    });
};

module.exports = {
    authenticateToken
};
