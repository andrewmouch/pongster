var express               = require("express"),
    app                   = express(),
    bodyParser            = require("body-parser"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    expressSession        = require("express-session");
    methodOverride        = require("method-override");

//models
var User    = require("./models/user"),
    Room    = require("./models/room");

//routes
var indexRoutes = require("./routes/index");
var roomRoutes = require("./routes/rooms");

mongoose.connect("mongodb://localhost/pongster", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(expressSession({
    secret: "This is the pongster application",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next) {
   res.locals.user = req.user;
   next();
});

app.use(indexRoutes);
app.use(roomRoutes);

app.listen(1234, function(){
	console.log('server has started!');
})