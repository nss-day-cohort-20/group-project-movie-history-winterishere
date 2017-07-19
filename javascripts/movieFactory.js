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