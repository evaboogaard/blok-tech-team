require("dotenv").config();
const mongoose = require('mongoose');

const connectionString = process.env.MONGO_URI;
const connectDB = async () => {
	try {
		mongoose.connect(connectionString, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		console.log("DB is connected");
	} catch (err) {
		console.log(`Could not make db connection: ${err}`);
		throw err;
	}
};

module.exports = connectDB;