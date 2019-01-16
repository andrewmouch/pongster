$(document).ready(function(){
	$("#find").hover(function () {
    	$('body').css("background-image", "url(\"/images/find.jpg\")");
    	$('button').css("opacity", "0.7");
    	$('h1').css("color", "white");
	}, 
	function () {
    	$('body').css("background-image", "url(\"/images/gradientPurple.png\")");
    	$('button').css("opacity", "none");
    	$('h1').css("color", "black");
	});

	$("#join").hover(function () {
    	$('body').css("background-image", "url(\"/images/join.jpg\")");
    	$('button').css("opacity", "0.7");
	}, 
	function () {
    	$('body').css("background-image", "url(\"/images/gradientPurple.png\")");
    	$('button').css("opacity", "none");
	});
});