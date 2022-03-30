// Express setup
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Models
const restaurant = require("./models/restaurant");

// Database
require("dotenv").config();
const db = require("./config/db");
db();

// Router
const router = require("./routes/routers");
app.use("/", router);

// Users
const usersRouter = require("./routes/users");
app.use("/", usersRouter);

// BodyParser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handlebars
const { engine } = require("express-handlebars");
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// Static
app.use("/static", express.static("static"));


app.get('/home', async (req, res) => {
    try {
        const data = await restaurant.findOne({ preference: "" }).lean().exec()
        res.render("home", { data: data });
    } catch {
        console.log("error");
    }
});

// User liked restaurant
app.post("/like", async (req, res) => {
  try {
    await restaurant
      .findOneAndUpdate({ preference: "" }, { preference: "like" })
      .lean()
      .exec();
    const data = await restaurant.findOne({ preference: "" }).lean().exec();
    res.render("home", { data: data });
  } catch {
    console.log("fout bij liken");
  }
});

// User disliked restaurant
app.post("/dislike", async (req, res) => {
  try {
    await restaurant
      .findOneAndUpdate({ preference: "" }, { preference: "dislike" })
      .lean()
      .exec();
    const data = await restaurant.findOne({ preference: "" }).lean().exec();
    res.render("home", { data: data });
  } catch {
    console.log("fout bij disliken");
  }
});

// Show list with liked restaurants
app.get("/likes", async (req, res) => {
  try {
    const data = await restaurant.find({ preference: "like" }).lean().exec();
    res.render("likes", { data: data });
  } catch {
    console.log("fout bij laden favorieten");
  }
});


// Filter function
app.post("/filteroutput", async (req, res) => {
    try {
        const { distance, stars, price } = req.body;
        console.log(req.body);
        const data = await restaurant.find({
                distance: { $lte: distance},
                stars: { $gte: stars},
                price: price,
                preference: "like"
        }).lean().exec();
        console.log(data);
        res.render("likes", { data: data });
    } catch {
        console.log("oeps filter stuk");
    }
});

// Remove filters and show all liked restaurants
app.post("/clearfilter", async (req, res) => {
    try {
        const data = await restaurant.find({ preference: "like" }).lean().exec();
        console.log(data);
        res.render("likes", { data: data });
    } catch {
        console.log("clear filter button error");
    }
});

// PORT
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});