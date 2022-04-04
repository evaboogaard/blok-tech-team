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
        type: Array,
        required: true
    },
    disliked:{
        type: Array,
        required: true
    }
})
module.exports = mongoose.model("User", userSchema)