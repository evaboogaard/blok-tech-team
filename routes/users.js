const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bodyParser = require("body-parser");
const alert = require("alert"); 
 
const bcrypt = require("bcrypt");
const saltRounds = 10;
const passport = require("passport");

let session;

const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

// const nodemailer = require("nodemailer");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post("/createaccount", async (req, res) => {
          const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
          const user = new User({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password: hashedPassword,
          });
        
         
          const user2 = await User.findOne({ email: req.body.email })
          if (user2) {
                   alert("Email already exists!")
         } else {
        
                  session = req.session;
                  console.log("Account aangemaakt!");
                  console.log(req.body);
                  user.save();
                  res.redirect('/login');
               }
         




  //     // laat dit ff in comments want ik kreeg een melding dat ik spam veroorzaakte HAHAHHAHAH
  //     // let transporter = nodemailer.createTransport({
  //     //   service: "hotmail",
  //     //   auth: {
  //     //     user: "dinder.co@hotmail.com",
  //     //     pass: "dinder420",
  //     //   },
  //     // });

  //     // transporter.sendMail({
  //     //   from: '"Dinder" <dinder.co@hotmail.com>', // sender
  //     //   to: user.email, // receiver
  //     //   subject: "Welcome to Dinder🍽!", // subject
  //     //   text: "Hi " + user.fname + " " + user.lname + ", welcome to Dinder!", // body
  //     // });

  //     /* Log gebruiker in of redirect naar login, maar niet zomaar view renderen
  //     return res.render("overviewaccount", {
  //       fname: req.body.fname,
  //       lname: req.body.lname,
  //       email: req.body.email,
  //     });
  //     */
  //     res.redirect('/login');
  //   }
  // });
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


module.exports = router;