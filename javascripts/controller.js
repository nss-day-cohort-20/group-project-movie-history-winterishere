'use strict';

let $ = require('jquery');
let db = require('./movieFactory');
let templates = require('./templateBuilder.js');
// let $container = $('.uiContainer--wrapper');
let $container = $('.container');


module.exports.newMovieSearch = () => {
  $(document).keypress(function(e) {
    var key = e.which;
    if(key == 13) {
      $container.html("");
      let searchValue = $("#search-bar").val();
        db.getMovies(searchValue);
    }
  });
};


// USED in main.js - activated on load
module.exports.addToWatchList = () => {
	$(document).on("click", ".card-link", function() {
    // push to fb
    let addedWatched = $(this).data("movieArr");
    console.log("added", addedWatched);
    db.addMovie(db.movieArr)
    .then( (movie) => {
      movie.id = db.movieId;
      let addMovie = templates.buildMovieCard();
		console.log("addToWatchList");
    });
  });
};
