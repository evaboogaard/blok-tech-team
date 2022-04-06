const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bodyParser = require("body-parser");
const alert = require("alert"); 
 
const bcrypt = require("bcrypt");
const saltRounds = 10;
const passport = require("passport");



const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

// const nodemailer = require("nodemailer");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post("/createaccount", async (req, res) => {
  try{
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const user = new User({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: hashedPassword,
    });

    const usercheck = await User.findOne({ email: req.body.email })
    if (usercheck) {
      alert("Email already exists!")
    } else {
      console.log("Account aangemaakt!");
      console.log(req.body);
      user.save();
      res.redirect('/login');
    }
  } catch(err) {
    console.error("Error creating account: " + err.message);
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

router.get("/overviewaccount", ensureAuthenticated, (req, res) => {
  try{
    res.render("overviewaccount", {
      fname: req.user.fname,
      lname: req.user.lname,
      email: req.user.email,
    });
  } catch(err) {
    console.error("Error loading overviewaccount: " + err.message);
  }
});

// login
router.get("/login", forwardAuthenticated, (req, res) => {
  try{
  res.render("login", { title: "Log In" });
  } catch(err) {
    console.error("Error loading login: " + err.message);
  }
});

router.post( "/login", passport.authenticate("local", {
    failureRedirect: "/login",
    
  }),
  (req, res) => {
  try{
    res.redirect('/home');
  } catch(err) {
    console.error("Error logging in: " + err.message);
  }
});

// Logout
router.get('/users/logout', ensureAuthenticated, (req, res) => {
  try{
    req.logout();
    res.redirect('/login');
  } catch(err) {
    console.error("Error logging out: " + err.message);
  }
});


// deleting the users account
router.post("/delete", ensureAuthenticated, (req, res) => {
  try{
    User.findOneAndDelete({ email: req.user.email })
      .then(() => {
        res.render("delete");
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  } catch(err) {
    console.error("Error deleting account: " + err.message);
  }
});


module.exports = router;