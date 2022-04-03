// Mongoose
const mongoose = require("mongoose");

// userschema 
const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    liked:{
        type: Array
    },
    disliked:{
        type: Array
    }
})
module.exports = mongoose.model("User", userSchema)