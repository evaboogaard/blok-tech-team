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


// Overviewaccount

/*
router.get('/overviewaccount', (req, res) => {
    res.render('overviewaccount', {'title': 'Account'});
});
*/



// Filter

router.get('/filter', (req, res) => {
    res.render('filter', {'title': 'Filter'});
});

// Delete page 
/*
router.get('/delete', (req, res) => {
    res.render('delete', {'title': 'Delete'}); 
}); 
*/

// Update page 

// router.get('/update', (req, res) =>{
//     res.render('update', {'title': 'Update'});
// }); 


module.exports = router;