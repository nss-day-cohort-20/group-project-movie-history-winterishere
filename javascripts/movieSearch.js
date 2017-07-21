// not in use!!!!!


// 'use strict';
// // uses api from database
// let $ = require('jquery');
// let dbGet = require("./dbGetter")();

// // func is exported and used in 
// module.exports.getMovies = (search) => {
//   return new Promise( ( resolve, reject) => {
//   	// makes a call to api db
//     $.ajax({
//       url: `${dbGet.baseURL}${dbGet.key}&query=${search}`
//     }).done( (movieData) => {
//       console.log("movie data", movieData);
//       resolve(movieData);
//     });
//   });
// };