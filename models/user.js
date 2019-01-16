let mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

let userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    fullName: String,
    userScore: {type: Number, default: 100}
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);