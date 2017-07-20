'use strict';

let $ = require('jquery');
let dbGet = require("./dbGetter")();

let movieArr = [];

module.exports.getMovies = (search) => {
  return new Promise( ( resolve, reject) => {
    $.ajax({
      url: `${dbGet.baseURL}${dbGet.key}&query=${search}`
    }).done( (movieData) => {
      for(let i = 0; i < 10; i++) {
        movieArr.push(movieData.results[i].id);
      }
      console.log("movie data", movieData);
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
  // for (let i = 0; i < movieResults.length; i++) {
  //   console.log("movie", movieData.results[i]);
  //   for (let j = 0; j < castArray.length; j++) {
  //     console.log("cast array", castArray);
  //   }
  castArray.forEach(function(items) {
    movieResults.forEach(function(results) {
      console.log("movie", results);
        items.forEach(function(actor) {
          console.log("actor", actor.name);
        });
    });
  });
}
// function addIds(songData) {
//   var idArr = Object.keys(songData);
//   console.log("idArr", idArr);
//   idArr.forEach( (key) => {
//     songData[key].id = key;
//   });
//   console.log("songData after ids", songData);
//   return songData;
// }

// module.exports.getSongs = () => {
//   return new Promise( ( resolve, reject) => {
//     let currentUser = firebase.auth().currentUser.uid;
//     $.ajax({
//       url: `${fbURL}/songs.json?orderBy="uid"&equalTo="${currentUser}"`//<.json is important!
//     }).done( (songData) => {
//       // console.log("songData", songData );
//       let amendedSongData = addIds(songData);
//       resolve(amendedSongData);
//     });
//   });
// };

// module.exports.getSong = (songId) => {
//   return new Promise( (resolve, reject) => {
//     $.ajax({
//       url: `${fbURL}/songs/${songId}.json`
//     }).done( (songData) => {
//       resolve(songData);
//     });
//   });
// };

// module.exports.addSong = (songFormObj) => {
//   return new Promise( (resolve, reject) => {
//     let currentUser = firebase.auth().currentUser.uid;
//     songFormObj.uid = currentUser;
//     $.ajax({
//       url: `${fbURL}/songs.json`,
//       type: "POST",
//       data: JSON.stringify(songFormObj),
//       dataType: "json"
//     }).done( (songId) => {
//       resolve(songId);
//     });
//   });
// };

// module.exports.saveEditedSong = (songObj, songId) => {
//   return new Promise( (resolve, reject) => {
//     if(songId) {
//       $.ajax({
//         url: `${fbURL}/songs/${songId}.json`,
//         type: "PUT",
//         data: JSON.stringify(songObj),
//         dataType: "json"
//       }).done( (songData) => {
//         resolve(songData);
//       }).fail( (err) => {
//         reject(err);
//       });
//     } else {
//       console.log("Your song ID is not good");
//     }
//   });
// };

// module.exports.deleteSong = (songId) => {
//   return new Promise( (resolve, reject) => {
//     if(songId) {
//       $.ajax({
//         url: `${fbURL}/songs/${songId}.json`,
//         type: "DELETE"
//       }).done( (stuff) => {
//         console.log("stuff", stuff);
//         resolve(stuff);
//       }).fail( (err) => {
//         reject(err);
//       });
//   } else {
//     console.log("Song not deleted");
//     }
//   });
// };