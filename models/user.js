// Mongoose
const mongoose = require("mongoose");

// userschema 
const userSchema = new mongoose.Schema({
    _id: {
        type: String
    },
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
    preferences:{
        id1: {type: String, required: true},
        id2: {type: String, required: true},
        id3: {type: String, required: true},
        id4: {type: String, required: true},
        id5: {type: String, required: true},
        id6: {type: String, required: true},
        id7: {type: String, required: true},
        id8: {type: String, required: true},
        id9: {type: String, required: true},
        id10: {type: String, required: true},
    }
})
module.exports = mongoose.model("User", userSchema)