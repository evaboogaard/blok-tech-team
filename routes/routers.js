const router = express.Router();

// Welcome

router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Login page

router.get('/login', (req, res) => res.render('login'));

// Signup

router.get('/signup', (req, res) => res.render('signup'));


// Register page

router.get('/createaccount', (req, res) => res.render('createaccount'));

//Home

router.get('/home', (req, res) => res.render('home'));

// Overviewaccount

router.get('/overviewaccount', (req, res) => res.render('overviewaccount'));

// Likes

router.get('/likes', (req, res) => res.render('likes'));


module.exports = router;