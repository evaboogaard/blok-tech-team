const express = require("express");
const app = express();
const router = express.Router();
const User = require("../models/user");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt")
const saltRounds = 10;

let session;

app.use(bodyParser.urlencoded({
    extended: true
}));

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
            return res.status(500).redirect('createaccount');
        } else {
            console.log("Account aangemaakt!")
            session = req.session;
            session.email = req.body.email;
            return res.render("overviewaccount", {
                fname: user.fname,
                lname: user.lname,
                email: user.email,
            });
        }
    });
});


module.exports = router;