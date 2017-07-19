'use strict';

let $ = require('jquery');
let dbGet = require("./dbGetter")();

module.exports.getMovies = (search) => {
  return new Promise( ( resolve, reject) => {
    $.ajax({
      url: `${dbGet.baseURL}${dbGet.key}&query=${search}`
    }).done( (movieData) => {
      console.log("movie data", movieData);
      resolve(movieData);
    });
  });
};