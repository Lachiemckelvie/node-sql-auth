const jwt = require('express-jwt');
const { secret } = require('../config/config');
const db = require('../database/db');

module.exports = authorize;

function authorize() {
    return [
        // authenticate JWT token
        jwt({ secret, algorithms: ['HS256'] }),

        // attach full user record to request object
        async (req, res, next) => {
            const user = await db.User.findByPk(req.user.sub);

            if (!user)
                return res.status(401).json({ message: 'Unauthorized' });

            req.user = user.get();
            next(); 
        }
    ];
}