const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator"); 

const bcrypt = require("bcrypt");
const saltRounds = 10;
const passport = require("passport");

let session;

const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

// const nodemailer = require("nodemailer");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(expressValidator()); 


router.post("/createaccount", async (req, res) => {
  // 1: validate the posted data, e.g. check if the email consists of only letters and numbers and contains an @ and a . ? (NOTE: this should be done in the frontend as well)  
  // 2: check if the email is already in use (check with the database)
  // 3: hash the password
  // 4: create a new user object
  // 5: save the user object to the database

  // 1. check data
  req.check('email', 'Invalid email address').isEmail;   // TODO: validation of email address; what if it isn't right? will the user receive a message?



  // 2. check email
  // TODO: make if/else statements for the situations I've described below.

  // voorbeeldje if/else statement: 
  // let myName = techkech

  // if (myName == 'Anna') {
  //   console.log('My name is Anna')
  // } else if (myName == 'techkech') {
  //   console.log('My name is techkech')
  // } else {
  //   console.log('My name is something else, not Anna or techkech')
  // }

  // check if the user already exists in the database (HINT: just google this and see if you can find a solution that you understand )
  // if not, create a new user (step 3, 4, 5) and add to the database

  // TODO search in database for a user with the same email (req.body.email)
  // if found, return an error message to the user that says 'sorry, email address already exists' or the like
  // if not found, create an object with the user info and add to the database

  // 3. hashing
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds); // hash the password

  // 4. user object
  const user = new User({ // create a new user object with the user info from the form, and as the password, use the hashed password
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: hashedPassword,
  });

// 5. save user
  user.save((error) => {
    if (error) {
      console.error(error);
      return res.status(500).redirect("createaccount");
    } else {
      session = req.session;
      //session.email = req.body.email;
      console.log("Account aangemaakt!");
      console.log(req.body);


      // THINGS FOR TRANSPORTER FEATURE:
      // laat dit ff in comments want ik kreeg een melding dat ik spam veroorzaakte HAHAHHAHAH
      // let transporter = nodemailer.createTransport({
      //   service: "hotmail",
      //   auth: {
      //     user: "dinder.co@hotmail.com",
      //     pass: "dinder420",
      //   },
      // });

      // transporter.sendMail({
      //   from: '"Dinder" <dinder.co@hotmail.com>', // sender
      //   to: user.email, // receiver
      //   subject: "Welcome to Dinder🍽!", // subject
      //   text: "Hi " + user.fname + " " + user.lname + ", welcome to Dinder!", // body
      // });

      /* Log gebruiker in of redirect naar login, maar niet zomaar view renderen
      return res.render("overviewaccount", {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
      });
      */
      res.redirect('/login');
    }
  });
});

router.get(
  "/overviewaccount", 
  ensureAuthenticated, 
  (req, res) => {
    res.render("overviewaccount", {
      fname: req.user.fname,
      lname: req.user.lname,
      email: req.user.email,
    });
});

// login
router.get("/login", forwardAuthenticated, (req, res) => {
  res.render("login", { title: "Log In" });
});

router.post(
  "/login", // in de documentatie van password.js staat telkens /login/password vermeld.. mss gaat het daar mis
  passport.authenticate("local", {
    //successRedirect: "/overviewaccount",
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res, next) => {
  // dit hier wordt niet uitgevoerd
  //req.session.user_email = req.user.email;
  //console.log(req.user);
  //console.log(res);
  //console.log(next);
  res.redirect('/home');
});

// Logout
router.get('/users/logout', ensureAuthenticated, (req, res) => {
  //https://www.passportjs.org/concepts/authentication/logout/
  req.logout();
  //req.flash('success_msg', 'You have been logged out');
  res.redirect('/login');
});

// logout 

// hou dit even gecomment tot de login functie helemaal werkt lol

// router.get("/logout", (req, res) => {

//   //  this will clear the login session and remove the req.user property 
//    req.logOut(); 

//   // deletes the cookie
//    req.session = null; 

//   //  redirects the user to the homepage
//    res.redirect('/'); 
// }); 


//  deleting the users account
router.post("/delete", ensureAuthenticated, (req, res) => {
  console.log(req.user);
  User.findOneAndDelete({ email: req.user.email })
    .then(() => {
      res.render("delete");
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});

// updating the users account
// router.post("/update", (req, res) => {
//   User.findOneAndUpdate({ id: req.body_id })

// });

module.exports = router;
