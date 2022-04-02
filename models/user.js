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
    preferences:{
        id1: {type: String},
        id2: {type: String},
        id3: {type: String},
        id4: {type: String},
        id5: {type: String},
        id6: {type: String},
        id7: {type: String},
        id8: {type: String},
        id9: {type: String},
        id10: {type: String},
    }
})
module.exports = mongoose.model("User", userSchema)