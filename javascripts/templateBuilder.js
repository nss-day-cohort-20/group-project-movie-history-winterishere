// the template builder requires the card.hbs
// exports buildMovieCard
// templateBuilder is required in movieFactory.js

'use strict';

let $ = require('jquery');
let movieListTemplate = require('../templates/card.hbs');

module.exports.makeMovieList = (movieList) => {
	return movieListTemplate({movie: movieList});
};

module.exports.buildMovieCard = (movieObj) => {

  let movieData = movieObj;
  return movieListTemplate(movieData);
};