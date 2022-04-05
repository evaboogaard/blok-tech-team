// Express setup
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport')
require('./config/passport')(passport);

app.use(flash());

//Express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Models
const restaurant = require("./models/restaurant");
const user = require("./models/user");

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
    const currentUser = await user.findOne({email: req.session.email});
    const allRestaurants = await restaurant.find().lean().exec();
    
    const filteredRestaurants = allRestaurants.filter((restaurant) => {
      return !currentUser.liked.includes(restaurant.id) && !currentUser.disliked.includes(restaurant.id);
    });

    const data = filteredRestaurants[0];
    res.render("home", { data: data });
  } catch(err) {
      console.error("Error loading homepage: " + err.message);
  }
});

app.post("/like", async (req, res) => {
  try {
    await user.updateOne(
      { email: req.session.email },
      { $push: { liked : req.body.id }}
    );

    const currentUser = await user.findOne({email: req.session.email});
    const allRestaurants = await restaurant.find().lean().exec();
    
    const filteredRestaurants = allRestaurants.filter((restaurant) => {
      return !currentUser.liked.includes(restaurant.id) && !currentUser.disliked.includes(restaurant.id);
    });
    
    const data = await filteredRestaurants[0];
    res.render("home", { data: data });
  } catch(err) {
    console.error("Error like: " + err.message);
  }
});

// User disliked restaurant
app.post("/dislike", async (req, res) => {
  try {
    await user.updateOne(
      { email: req.session.email },
      { $push: { disliked : req.body.id }}
    );

    const currentUser = await user.findOne({email: req.session.email});
    const allRestaurants = await restaurant.find().lean().exec();
    
    const filteredRestaurants = allRestaurants.filter((restaurant) => {
      return !currentUser.liked.includes(restaurant.id) && !currentUser.disliked.includes(restaurant.id);
    });
    
    const data = await filteredRestaurants[0];
    res.render("home", { data: data });
  } catch(err) {
    console.error("Error dislike: " + err.message);
  }
});

// Show list with liked restaurants
app.get("/likes", async (req, res) => {
  try {
    const currentUser = await user.findOne({email: req.session.email});
    const allRestaurants = await restaurant.find().lean().exec();
    console.log(currentUser);
    console.log(req.session.email)
    
    const likedRestaurants = allRestaurants.filter((restaurant) => {
      return currentUser.liked.includes(restaurant.id);
    });
    res.render("likes", { data: likedRestaurants });
  } catch {
    console.log("fout bij laden favorieten");
  }
});

// Remove restaurant from likes
app.post("/remove", async (req, res) => {
  try {
    // Remove restaurantid from liked
    await user.updateOne(
      { email: req.session.email },
      { $pull: { liked : req.body.id }}
    );

    // Add restaurantid to disliked
    await user.updateOne(
      { email: req.session.email },
      { $push: { disliked : req.body.id }}
    );

    const currentUser = await user.findOne({email: req.session.email});
    const allRestaurants = await restaurant.find().lean().exec();
    
    const likedRestaurants = allRestaurants.filter((restaurant) => {
      return currentUser.liked.includes(restaurant.id);
    });

    res.render("likes", { data: likedRestaurants });

      // await restaurant.findOneAndUpdate({ naam: req.body.naam },{ voorkeur: "dislike" }).exec();
      // const data = await restaurant.find({ voorkeur: "like" }).lean().exec();
      // res.render("favorieten", { data: data });
  } catch {
      console.log("fout bij verwijderen");
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