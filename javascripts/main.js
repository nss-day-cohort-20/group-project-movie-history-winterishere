"use strict";

let $ = require("jquery");
let controller = require("./controller");
let userFactory = require("./userFactory");
let db = require('./movieFactory');


//When the user clicks the log in link, this calls the function to log them in with firebase
$("#log-on").click( function() {
	userFactory.logInGoogle()
	.then( (result) => {
		let user = result.user.uid;
		console.log("user", user);
	});
});

//When the user clicks the log out link, this calls the function to log them out
//it also refreshes the page so that the user returns to the default website
$("#log-out").click( function() {
	userFactory.logOutGoogle();
	location.reload();
});

$(document).on("click", ".card-link", function() {
	let movieId = $(this).data("add-watch");
	controller.addToWatchList(movieId);
});

$(document).keypress(function(e) {
  var key = e.which;
  if(key == 13) {
    let searchValue = $("#search-bar").val();
      db.getMovies(searchValue);
  }
 });