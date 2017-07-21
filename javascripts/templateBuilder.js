// the template builder requires the card.hbs
// exports buildMovieCard
'use strict';

let $ = require('jquery');
let movieListTemplate = require('../templates/card.hbs');

module.exports.buildMovieCard = (movieObj) => {

  let movieData = movieObj;
  return movieListTemplate(movieData);
};