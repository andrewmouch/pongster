var express        = require("express"),
	app            = express(),
	router         = express.Router(),
	Room           = require("../models/room"),
	passport       = require("passport"),
	bodyParser     = require("body-parser");
	XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

app.use(bodyParser.urlencoded({extended: true}));

router.get("/rooms",  function(req,res){
	res.render("findPongRoom");
});

router.get("/rooms/find", function(req,res){
    Room.find({}, function(err, rooms) {
        if(err) {
            alert(err);
        } else {
        	imageExist = [];
        	rooms.forEach(function(room, index){
        		imageExist[index] = imageExists(room.image);
        	});
        	console.log(imageExist);
            res.render("availRooms", {rooms: rooms, imageExist: imageExist});
        }
    })
});

router.get("/rooms/create", function(req,res){
	res.render("createRoom");
});

router.post("/rooms/create", function(req,res){
	console.log("=======================");
	console.log(req.body.fullName);
	console.log(req.body.imgUrl);
	console.log(req.body.comment);
	console.log(req.user._id);
	console.log(req.user.username);
   	var name = req.body.fullName;
   	var image = req.body.imgUrl;
   	var description = req.body.comment;
   	var users = [{
       id: req.user._id,
       username: req.user.username,
       isCreator: true
   	}];
   	var newRoom = {name: name, image: image, description: description, users: users}
   	console.log(newRoom);
   	Room.create(newRoom, function(err, newRoom) {
      	if(err) {
           res.redirect("/rooms/create");
           alert("There was an error adding room");
       	} else {
       		console.log(newRoom);
           	res.redirect("/rooms/" + newRoom._id); 
       }
   });	
});

router.get("/rooms/:roomid", isLoggedIn, function(req,res){
	res.render("room")
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

function imageExists(image_url){

    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    return http.status != 404;

}

module.exports = router;