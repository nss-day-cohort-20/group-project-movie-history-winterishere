'use strict';

let $ = require('jquery');
let dbGet = require("./dbGetter")();
let $container = $('.container');
let templates = require('./templateBuilder');
let formTemplate = require('../templates/card.hbs');

let movieArr = [];

module.exports.getMovies = (search) => {
  return new Promise( ( resolve, reject) => {
    $.ajax({
      url: `${dbGet.baseURL}${dbGet.key}&query=${search}`
    }).done( (movieData) => {
      for(let i = 0; i < 10; i++) {
        movieArr.push(movieData.results[i].id);
      }
      let promiseArray = makeActorPromises();
      Promise.all(promiseArray)
      .then((credits) => {
        getCast(movieData, credits);
      });
      //call a new function that takes the arguments "movieData" and "credits", and have that function combine them
      resolve(movieData);
    });
  });
};

function makeActorPromises() {
  let promiseArray = [];
  for (let i = 0; i < movieArr.length; i++) {
    let actorURL = `https://api.themoviedb.org/3/movie/${movieArr[i]}/credits?api_key=${dbGet.key}`;
    promiseArray.push(getActors(actorURL));
  }
  return promiseArray;
}

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

function getCast(movieData, credits) {
  let castArray = [];
  for (let i = 0; i < credits.length; i++) {
    let cast = credits[i].cast.splice(0, 3);
    castArray.push(cast);
  }
  buildCastArray(movieData, castArray);
}

function buildCastArray(movieData, castArray) {
  let movieResults = movieData.results;
  movieResults.forEach(function(movie, index) {
    movie.castList = castArray[index];
    console.log("movie", movie);
    let completedCard = templates.buildMovieCard(movie);
    $container.append(completedCard);
  });
}
