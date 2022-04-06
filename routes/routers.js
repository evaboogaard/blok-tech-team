const express = require("express");
const router = express.Router();

// Welcome
router.get("/", (req, res) => {
  try {
    res.render("welcome", { title: "Welcome" });
  } catch (err) {
    console.error("Error loading welcome: " + err.message);
  }
});

// Signup
router.get("/signup", (req, res) => {
  try {
    res.render("signup", { title: "Sign Up" });
  } catch (err) {
    console.error("Error loading signup: " + err.message);
  }
});

// Register page
router.get("/createaccount", (req, res) => {
  try {
    res.render("createaccount", { title: "Create Account" });
  } catch (err) {
    console.error("Error loading createaccount: " + err.message);
  }
});

module.exports = router;
