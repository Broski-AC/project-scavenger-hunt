const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../../middleware/auth');

// User Model
const User = require('../../models/user');

// @route POST api/auth
// @desc Auth the user
// @access Public

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Simple validation
    if ( !email || !password) {
        return res.status(400).json({ msg: 'Please enter values into all the fields - auth'});
    }

    // Check for existing user
    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'User does not exist' });

           
            // Validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials'});

                    jwt.sign(
                        {
                            id: user.id
                        },
                        config.get('jwtSecret'),
                        // Sets expiration to 1 hours time
                        // Token only lasts for 1 hour
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;

                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            });
                        }
                    )
                })
        })
});

router.get('/user', auth, (req, res) => {
    try {
        const user = User.findById(req.user.id).select('-password');
        if (!user) throw Error('User Does not exist');
        res.json(user);
    }
    catch (e) {
        res.status(400).json({ msg: e.message});
    }
});

module.exports = router;