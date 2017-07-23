'use strict';
//
let $ = require('jquery');
let dbGet = require("./dbGetter")();
let $container = $('.container');
let templates = require('./templateBuilder');
let formTemplate = require('../templates/card.hbs');
let fbURL = "test-9f12e.firebaseapp.com";
let firebase = require('./fbConfig');

// empty arr that we are pushing movieData results into
let movieArr = [];

// getMovies is getting exported & used in the controller
// getMovies returnes a promise
module.exports.getMovies = (search) => {
  return new Promise( ( resolve, reject) => {
    // makes a call to the database for movie data
    $.ajax({
      url: `https://api.themoviedb.org/3/search/movie?api_key=${dbGet.key}&query=${search}"`
    }).done( (movieData) => {
      // looping through set of 10 in movieData and pushing to movieArr
      for(let i = 0; i < 10; i++) {
        movieArr.push(movieData.results[i].id);
      }
      console.log("movie id???", movieArr);
      // sets var = to func makeActorPromises & runs promise.all
      let promiseArray = makeActorPromises();
      Promise.all(promiseArray)
      // uses makeActorPromises func to get credit info from api
      .then((credits) => {
        getCast(movieData, credits);
      });
      //call a new function that takes the arguments "movieDa// makes a call to the database for movie datata" and "credits", and have that function combine them
      resolve(movieData);
    });
  });
};

// func is a helper ran in getMovies
function makeActorPromises() {
  // empty arr that actors is pushed into
  let promiseArray = [];
  // loops through moviesArry (movie data)
  for (let i = 0; i < movieArr.length; i++) {
    // sets actorURL to url that gets actor info
    let actorURL = `https://api.themoviedb.org/3/movie/${movieArr[i]}/credits?api_key=${dbGet.key}`;
    // adds actors to promiseArr
    promiseArray.push(getActors(actorURL));
  }
  return promiseArray;
}

// helper func returns a promise used in promise.all
function getActors(actorURL) {
  //fetch actors from API, but wrap it in a promise
  //This returns a promise
  return new Promise((resolve, reject) => {
    $.ajax({
        url: actorURL
      }).done( (actorData) => {
        resolve(actorData);
    });
  });
}

// helper func returns a promise used in promise.all
function getCast(movieData, credits) {
  // empty arr cast goes into
  let castArray = [];
  // loops through credits and splices/only uses 3 we want
  for (let i = 0; i < credits.length; i++) {
    let cast = credits[i].cast.splice(0, 3);
    // pushs cast to arr
    castArray.push(cast);
  }
  // calls buildCastArr and passes in our cast array and the data from the movie API
  buildCastArray(movieData, castArray);
}

// helper func returns a promise used in promise.all
function buildCastArray(movieData, castArray) {
  // setting movieResults to movieData
  let movieResults = movieData.results;
  // for each movie
  movieResults.forEach(function(movie, index) {
    // cast array at each index matched the movie index
    movie.castList = castArray[index];
    movie.release_date = movie.release_date.substring(0,4);
    // console.log("movie date", movie.release_date);
    // setting completedCard to fully built card
    let completedCard = templates.buildMovieCard(movie);
    // printing into the dom appended to the cards from handlebars
    $container.append(completedCard);
  });
}

// helper func returns a promise used in promise.all
module.exports.addMovie = (movieData) => {
  console.log("movieData", movieData);
  return new Promise( (resolve, reject) => {
    // setting var that sets the firebase auth to current user
    let currentUser = firebase.auth().currentUser.uid;
    // setting current user to each movie obj
    movieData.uid = currentUser;
    // call that posts users movies to fb
    $.ajax({
      url: `${fbURL}/movies.json`,
      type: "POST",
      data: JSON.stringify(movieData),
      dataType: "json"
    }).done( (movieId) => {
      resolve(movieId);
    });
  });
};

// movie api id and user id check
// saving when addd a movie below
// movie id = need
// user id = check
// prop status : watched y/n rating: default = 0 under 9 blah 9+ fav
