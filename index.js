// Express setup
const express = require("express");
const compression = require("compression");
const app = express();
const PORT = process.env.PORT || 3000;

const session = require("express-session");
const passport = require("passport");
require("./config/passport")(passport);

app.use(
  compression({
    level: 6,
    threshold: 0,
  })
);

// Session
app.use(
  session({
    name: "sessionID",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

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
const { ensureAuthenticated } = require("./config/auth");
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// Static
app.use("/static", express.static("static"));

app.get("/home", ensureAuthenticated, async (req, res) => {
  try {
    const currentUser = await user.findOne({ email: req.user.email });
    const allRestaurants = await restaurant.find().lean().exec();

    const filteredRestaurants = allRestaurants.filter((restaurant) => {
      return (
        !currentUser.liked.includes(restaurant.id) &&
        !currentUser.disliked.includes(restaurant.id)
      );
    });

    const data = filteredRestaurants[0];
    res.render("home", { data: data });
  } catch (err) {
    console.error("Error loading homepage: " + err.message);
  }
});

app.post("/like", ensureAuthenticated, async (req, res) => {
  try {
    await user.updateOne(
      { email: req.user.email },
      { $push: { liked: req.body.id } }
    );

    const currentUser = await user.findOne({ email: req.user.email });
    const allRestaurants = await restaurant.find().lean().exec();

    const filteredRestaurants = allRestaurants.filter((restaurant) => {
      return (
        !currentUser.liked.includes(restaurant.id) &&
        !currentUser.disliked.includes(restaurant.id)
      );
    });

    const data = await filteredRestaurants[0];
    res.render("home", { data: data });
  } catch (err) {
    console.error("Error on like: " + err.message);
  }
});

// User disliked restaurant
app.post("/dislike", ensureAuthenticated, async (req, res) => {
  try {
    await user.updateOne(
      { email: req.user.email },
      { $push: { disliked: req.body.id } }
    );

    const currentUser = await user.findOne({ email: req.user.email });
    const allRestaurants = await restaurant.find().lean().exec();

    const filteredRestaurants = allRestaurants.filter((restaurant) => {
      return (
        !currentUser.liked.includes(restaurant.id) &&
        !currentUser.disliked.includes(restaurant.id)
      );
    });

    const data = await filteredRestaurants[0];
    res.render("home", { data: data });
  } catch (err) {
    console.error("Error on dislike: " + err.message);
  }
});

// Show list with liked restaurants
app.get("/likes", ensureAuthenticated, async (req, res) => {
  try {
    const currentUser = await user.findOne({ email: req.user.email });
    const allRestaurants = await restaurant.find().lean().exec();

    const likedRestaurants = allRestaurants.filter((restaurant) => {
      return currentUser.liked.includes(restaurant.id);
    });
    res.render("likes", { data: likedRestaurants });
  } catch (err) {
    console.error("Error loading likes: " + err.message);
  }
});

// Remove restaurant from likes
app.post("/remove", ensureAuthenticated, async (req, res) => {
  try {
    // Remove restaurantid from liked
    await user.updateOne(
      { email: req.user.email },
      { $pull: { liked: req.body.id } }
    );

    // Add restaurantid to disliked
    await user.updateOne(
      { email: req.user.email },
      { $push: { disliked: req.body.id } }
    );

    const currentUser = await user.findOne({ email: req.user.email });
    const allRestaurants = await restaurant.find().lean().exec();

    const likedRestaurants = allRestaurants.filter((restaurant) => {
      return currentUser.liked.includes(restaurant.id);
    });

    res.render("likes", { data: likedRestaurants });
  } catch (err) {
    console.error("Error remove restaurant: " + err.message);
  }
});

// Filter function
app.post("/filteroutput", ensureAuthenticated, async (req, res) => {
  try {
    const currentUser = await user.findOne({ email: req.user.email });
    const allRestaurants = await restaurant.find().lean().exec();

    const likedRestaurants = allRestaurants.filter((restaurant) => {
      return currentUser.liked.includes(restaurant.id);
    });

    let filter_likedRestaurants = likedRestaurants.filter(function (
      restaurants
    ) {
      const { distance, stars, price } = req.body;
      if (req.body.price === undefined) {
        return restaurants.distance <= distance && restaurants.stars >= stars;
      } else {
        return (
          restaurants.distance <= distance &&
          restaurants.stars >= stars &&
          restaurants.price == price
        );
      }
    });

    res.render("likes", { data: filter_likedRestaurants });
  } catch (err) {
    console.error("Error filter results: " + err.message);
  }
});

// Remove filters and show all liked restaurants
app.post("/clearfilter", ensureAuthenticated, async (req, res) => {
  try {
    const currentUser = await user.findOne({ email: req.user.email });
    const allRestaurants = await restaurant.find().lean().exec();

    const likedRestaurants = allRestaurants.filter((restaurant) => {
      return currentUser.liked.includes(restaurant.id);
    });
    res.render("likes", { data: likedRestaurants });
  } catch (err) {
    console.error("Error remove filters: " + err.message);
  }
});

// PORT
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
