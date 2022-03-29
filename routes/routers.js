const express = require("express");
const router = express.Router();

// Welcome

router.get('/', (req, res) => {
    res.render('welcome', {'title': 'Welcome'});
});

// Login page

router.get('/login', (req, res) => {
    res.render('login', {'title': 'Log In'});
});

// Signup

router.get('/signup', (req, res) => {
    res.render('signup', {'title': 'Sign Up'});
});


// Register page

router.get('/createaccount', (req, res) => {
    res.render('createaccount', {'title': 'Create Account'});
});

//Home

router.get('/home', (req, res) => {
    res.render('home', {'title': 'Home'});
});

// Overviewaccount

router.get('/overviewaccount', (req, res) => {
    res.render('overviewaccount', {'title': 'Account'});
});

// Likes

router.get('/likes', (req, res) => {
    res.render('likes', {'title': 'Likes'});
});


module.exports = router;