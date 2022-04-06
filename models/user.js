// Mongoose
const mongoose = require("mongoose");

// userschema
const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    trim: true,
    minLength: [2, "Name is too short!"],
    maxLength: [100, "Name is too long!"],
  },
  lname: {
    type: String,
    required: true,
    trim: true,
    minLength: [2, "Name is too short!"],
    maxLength: [200, "Name is too long!"],
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minLength: [2, "Email is too short!"]
  },
  password: {
    type: String,
    required: true,
  },
  liked: {
    type: Array,
    required: true,
  },
  disliked: {
    type: Array,
    required: true,
  },
  accountCreated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);