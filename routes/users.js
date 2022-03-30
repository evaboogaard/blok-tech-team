const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bodyParser = require("body-parser");

const bcrypt = require("bcrypt");
const saltRounds = 10;

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
    }
  });
});

router.post("/login", async (req, res) => {
  try {
    const getUser = await User.findOne({ email: req.body.email });
    if (getUser) {
      const comparePassword = await bcrypt.compare(
        req.body.password,
        getUser.password
      );
      if (comparePassword) {
        console.log("It's a great success!");
        return res.status(200).redirect("/overviewaccount");
      } else {
        console.error("Wrong e-mail or password!");
        return res.status(404).redirect("/login");
      }
    } else {
      console.error("Wrong e-mail or password!!");
      return res.status(404).redirect("/login");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).redirect("/login");
  }
});

router.post("/delete", (req, res) => {
  User.findOneAndDelete({ id: req.body._id })
    .then(res.render("welcome"))
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});

module.exports = router;
