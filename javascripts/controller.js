'use strict';

let $ = require('jquery');
let db = require('./movieFactory');
let firebase = require('./fbConfig');

//called on click of "Add to Watchlist" from main.js, we now send firebase an object with the movie information we need not contained in the api - MB

module.exports.addToWatchList = (movieId) => {
  let currentUser = firebase.auth().currentUser.uid;
  console.log("movieId", movieId);
  console.log("printmymessage", currentUser);
    let newMovieObj = {
      id: movieId,
      user: currentUser,
      watched: false
    };
    db.addMovie(newMovieObj)
//resolve after posting to firebase, not sure what was going on here - MB
    .then( (movie) => {
		console.log("addToWatchList");
    });
};

