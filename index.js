// Express setup
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Models
const restaurant = require("./models/restaurant");

// Database
require('dotenv').config();
const db = require("./config/db");
db();

// BodyParser
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });

// Handlebars
const { engine } = require("express-handlebars");
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// Static
app.use("/static", express.static("static"));

app.get('/', async (req, res) => {
    try {
        const data = await restaurant.findOne({ preference: "" }).lean().exec()
        res.render("home", { data: data });
        console.log(data);
    } catch {
        console.log("error");
    }
});

// User liked restaurant
app.post("/like", async (req, res) => {
    try {
        await restaurant.findOneAndUpdate({ preference: ""}, { preference: "like" }).lean().exec();
        const data = await restaurant.findOne({ preference: "" }).lean().exec();
        res.render("home", { data: data });
    } catch {
        console.log("fout bij liken");
    }
});

// User disliked restaurant
app.post("/dislike", async (req, res) => {
    try {
        await restaurant.findOneAndUpdate({ preference: "" }, { preference: "dislike" }).lean().exec();
        const data = await restaurant.findOne({ preference: "" }).lean().exec();
        res.render("home", { data: data });
    } catch {
        console.log("fout bij disliken");
    }
});

// PORT
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

// Comment