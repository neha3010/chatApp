const express = require("express");
const req = require("express/lib/request");
const passport = require("passport");
const User = require('../models/User');
const router = express.Router();

// Registration Route
router.post("/register", (rep, res) => {
    const { email, password } = req.body;
    User.register(new User({ email }), password, (err, user) => {
        if (err) {
            console.error('Error registering user:', err);
            return res.status(500).json({error: err.message });
        }
        passport.authenticate('local')(req, res, () => {
            res.json({ message: 'Registration successful', user: req.user});
        });
    });
});

// Login route
router.post("/login", passport.authenticate("local"), (rep, res) => {
    res.json({ message: 'Login successful', user: req.user});  // Successful authentication response
});

// Logout route
router.get("/logout", (req, res) => {
    req.logout();
    res.json({ message: 'Logout successful' });
});

module.exports = router;
