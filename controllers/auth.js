const User = require('../models/User');
const { createTokens } = require('../utils/createToken');
const bcrypt = require('bcrypt');

exports.auth = (req, res) => {
    
    User({ skipTenant: true }).findOne({ email: req.body.email }, (err, user) => {
        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            bcrypt.compare(req.body.password, user.password, function (err, response) {
                if (err) {
                    res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                } else {
                    res.json({
                        success: true,
                        token: createTokens(user),
                        user: user
                    });
                }
            });

        }
    });
};