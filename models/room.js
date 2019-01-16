var mongoose = require("mongoose");

var roomSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   users: [{
	        id: {
		        type: mongoose.Schema.ObjectId,
		        ref: "User"
	        },
	        username: String,
	        isCreator: {type:Boolean, default:false}
    	}]       
});

module.exports = mongoose.model("Room", roomSchema);