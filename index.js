// Express setup
const express = require("express");
const helmet = require('helmet');
const app = express();
const PORT = process.env.PORT || 3000;
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport')
require('./config/passport')(passport);



app.use(flash());
app.use(helmet())
app.use(session({ // set up the session
  name: 'sessionID' , // name of the cookie
  secret: 'secret', // secret for the cookie
  resave: false,  // don't save the session if it hasn't changed
  saveUninitialized: false // don't save the session if it hasn't been modified
  // cookie: { // set the cookie
  //   secure: false // set the cookie to be secure (https)
  // }
}))
//Express session
// app.use(session({
//     secret: 'secret',
//     resave: true,
//     saveUninitialized: false
// }));


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

// www.dingendoen.nl --> dit noemen we de homepage, maar zit dus op de '/'-route

// localhost:3000/home
// www.dingendoen.nl/home

app.get('/home', ensureAuthenticated, async (req, res) => { // routenaam is superverwarrend, misschien veranderen naar iets logischer zoals '/restaurants'?
  try {
    console.log('request session object:' + req.session)
    console.log('email waarmee gezocht wordt:' + req.user.email)
    // --> er bestaat geen session.email, dus je zal de accountdata in de database op een of andere manier moeten kunnen koppelen aan de huidige (passport)session data.

    const currentUser = await user.findOne({email: req.user.email}); // find user in database by email
    console.log(currentUser);
    const allRestaurants = await restaurant.find().lean().exec(); // alle restaurants in de database
    
    const filteredRestaurants = allRestaurants.filter((restaurant) => { // filter restaurants op wel/niet geliked
      // console.log('currentUser: ' + currentUser) --> is undefined, zie boven

      return !currentUser.liked.includes(restaurant.id) && !currentUser.disliked.includes(restaurant.id); 
    });

    const data = filteredRestaurants[0];
    res.render("home", { data: data });
  } catch(err) {
    console.log('error message is hier:' + err)
      console.error("Error loading homepage: dinges " + err.message);
  }
});

app.post("/like", async (req, res) => {
  try {
    await user.updateOne(
      { email: req.user.email },
      { $push: { liked : req.body.id }}
    );

    const currentUser = await user.findOne({email: req.user.email});
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
      { email: req.user.email },
      { $push: { disliked : req.body.id }}
    );

    const currentUser = await user.findOne({email: req.user.email});
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
    const currentUser = await user.findOne({email: req.user.email});
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
      { email: req.user.email },
      { $pull: { liked : req.body.id }}
    );

    // Add restaurantid to disliked
    await user.updateOne(
      { email: req.user.email },
      { $push: { disliked : req.body.id }}
    );

    const currentUser = await user.findOne({email: req.user.email});
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
    const currentUser = await user.findOne({email: req.user.email});
    const allRestaurants = await restaurant.find().lean().exec();
    
    const likedRestaurants = allRestaurants.filter((restaurant) => {
      return currentUser.liked.includes(restaurant.id);
    });

    let filter_likedRestaurants = likedRestaurants.filter(function(restaurants) {
      const { distance, stars, price } = req.body;
      return restaurants.distance <= distance && restaurants.stars >= stars && restaurants.price == price });
  
    console.log(filter_likedRestaurants);
    res.render("likes", { data: filter_likedRestaurants });
    
  } catch {
    console.log("filter error");
  }
});

// Remove filters and show all liked restaurants
app.post("/clearfilter", async (req, res) => {
    try {
      const currentUser = await user.findOne({email: req.user.email});
      const allRestaurants = await restaurant.find().lean().exec();
      
      const likedRestaurants = allRestaurants.filter((restaurant) => {
        return currentUser.liked.includes(restaurant.id);
      });
      res.render("likes", { data: likedRestaurants });
    } catch {
        console.log("clear filter error");
    }
});

// PORT
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});