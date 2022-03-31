const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bodyParser = require("body-parser");

const bcrypt = require("bcrypt");
const saltRounds = 10;
const passport = require('passport');

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const nodemailer = require("nodemailer");

router.use(bodyParser.urlencoded({ extended: true }));

router.post("/createaccount", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  const user = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: hashedPassword,
  });

  user.save((error) => {
    if (error) {
      console.error(error);
      return res.status(500).redirect("createaccount");
    } else {
      console.log("Account aangemaakt!");
    }
})
});

router.get('/overviewaccount', ensureAuthenticated, (req, res) =>
  User.find( { }, (error, users) => {
    res.render('overviewaccount', {
      fname: req.user.fname,
      lname: req.user.lname,
      email: req.user.email
    })
  })  
);

//Login
router.get('/login', forwardAuthenticated, (req, res) => {
    res.render('login', {'title': 'Log In'});
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/overviewaccount',
      failureRedirect: '/login',
      failureFlash: true
    })(req, res, next);
  });

router.post('/delete', (req, res) => {
    User.findOneAndDelete({id: req.body._id }).then(
        res.render('welcome')
    ).catch((error) => {
        res.status(400).json({
            error: error
        });
    })
      
    let transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
          user: "dinder.co@hotmail.com",
          pass: "dinder420",
        },
      });

      transporter.sendMail({
        from: '"Dinder" <dinder.co@hotmail.com>', // sender
        to: user.email, // receiver
        subject: "Welcome to Dinder🍽!", // subject
        text: "Hi " + user.fname + " " + user.lname + ", welcome to Dinder!", // body
      });

      return res.render("overviewaccount", {
        fname: user.fname,
        lname: user.lname,
        email: user.email,
      });
    
  });



//  deleting the users account
router.post("/delete", (req, res) => {
  User.findOneAndDelete({ id: req.body._id })
    .then(res.render("welcome"))
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});


// updating the users account
router.post("/update", (req, res) => {
  User.findOneAndUpdate({ id: req.body_id })
  
}); 




module.exports = router;