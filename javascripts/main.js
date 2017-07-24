"use strict";

let $ = require("jquery");
let controller = require("./controller");
let userFactory = require("./userFactory");

//Allows all elements with event listeners to be activated on load
controller.newMovieSearch();
controller.addToWatchList();

//When the user clicks the log in link, this calls the function to log them in with firebase
//It also loads the user's movies to the DOM
$("#log-on").click( function() {
	$("#log-out").addClass("hideIt");
	$(".messagePreLogin").addClass("hideIt");
	userFactory.logInGoogle()
	.then( (result) => {
		let user = result.user.uid;
		console.log("user", user);
		$("#log-out").removeClass("hideIt");
		$(".messagePostLogin").removeClass("hideIt");

	});
});

//When the user clicks the log out link, this calls the function to log them out
//it also refreshes the page so that the user returns to the default website
$("#log-out").click( function() {
	$("#log-out").addClass("hideIt");
	userFactory.logOutGoogle();
	location.reload();
});