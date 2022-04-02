const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bodyParser = require("body-parser");

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

  user.save((error) => {
    if (error) {
      console.error(error);
      return res.status(500).redirect("createaccount");
    } else {
      session = req.session;
      session.email = req.body.email;
      console.log("Account aangemaakt!");
      console.log(req.body);

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

      return res.render("overviewaccount", {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
      });
    }
  });
});

router.get("/overviewaccount", ensureAuthenticated, (req, res) =>
  User.find({}, () => {
    res.render("overviewaccount", {
      fname: req.session.fname,
      lname: req.session.lname,
      email: req.session.email,
    });
  })
);

//Login
router.get("/login", forwardAuthenticated, (req, res) => {
  res.render("login", { title: "Log In" });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/overviewaccount",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
});

//  deleting the users account
router.post("/delete", (req, res) => {
  User.findOneAndDelete({ email: req.session.email })
    .then(console.log(req.session.email), res.redirect("/delete"))
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
