const express = require("express");
const router = express.Router();

// Welcome

router.get('/', (req, res) => {
    res.render('welcome', {'title': 'Welcome'});
});

// Signup

router.get('/signup', (req, res) => {
    res.render('signup', {'title': 'Sign Up'});
});


// Register page

router.get('/createaccount', (req, res) => {
    res.render('createaccount',  {'title': 'Create Account'});
});

// Filter

router.get('/filter', (req, res) => {
    res.render('filter', {'title': 'Filter'});
});

module.exports = router;