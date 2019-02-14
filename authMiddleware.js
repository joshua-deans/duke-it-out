const jwt = require('jsonwebtoken');
const secret = require('./config').secret;

const checkAuth = function(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).send({message: 'Unauthorized: No token provided'});
    } else {
        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                res.status(401).send({message: 'Unauthorized: Invalid token'});
            } else {
                req.user = {};
                req.user.id = decoded.id;
                req.user.username = decoded.username;
                req.user.email = decoded.email;
                next();
            }
        });
    }
};
module.exports = checkAuth;