var express  = require("express");
	router     = express.Router(),
  User       = require("../models/user"),
	passport   = require("passport");

router.get("/", function(req, res){
	res.render("landing");
});

router.get("/login", function(req,res){
	res.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/rooms",
    failureRedirect: "/login"
}), function(req, res) {
});

router.get("/register", function(req,res){
	res.render("register");
});

router.post("/register", function(req,res){
	User.register(new User({username: req.body.username, email: req.body.email, fullName: req.body.fullName}), req.body.password, function(err, usr) {
      if(err) {
          console.log(err);
          return res.render("register");
      } else {
          passport.authenticate("local")(req, res, function() {
             res.redirect("/rooms");
          });
      }
   });
});

router.get("/forgot-password", function(req,res){
	res.render("forgotPassword");
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

function isLoggedOut(req, res, next) {
    if(!req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('back');
    }
}

module.exports = router;