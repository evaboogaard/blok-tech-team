const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
	name: String,
	img: String,
	address: String,
	price: String,
	time: String,
	preference: String,
	stars: String,
	distance: String
});

module.exports = mongoose.model("restaurant", restaurantSchema);