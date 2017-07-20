'use strict';

let $ = require('jquery');
let db = require('./movieFactory');
// let templates = require('./template-builder');
// let $container = $('.uiContainer--wrapper');

module.exports.newMovieSearch = () => {
  $(document).keypress(function(e) {
    var key = e.which;
    if(key == 13) {
      let searchValue = $("#search-bar").val();
        db.getMovies(searchValue);
    }
  });
};

module.exports.addToWatchList = () => {
	$(".card-link").click(function() {
		//post to firebase
		console.log("addToWatchList");
		// db.addMovie(movieObj);
	});
};

// module.exports.loadSongsToDom = () => {
//   db.getSongs()
//   .then( (songData) => {
//     console.log("songData", songData);
//     let songList = templates.makeSongList(songData);
//     $container.html(songList);
//   });
// };


//   $(document).on("click", ".edit-btn", function() {
//     console.log("edit btn clicked");
//     let songId = $(this).data("edit-id");
//     db.getSong(songId)
//     .then( (song) => {
//       song.id = songId;
//       let editForm = templates.buildSongForm(song);
//       $container.html(editForm);
//     });
//   });

//   $(document).on("click", ".save_edit_btn", function() {
//     //save edited song;
//     console.log("saving edited song");
//     let songObj = buildSongObj();
//     let songId = $(this).attr("id");
//     db.saveEditedSong(songObj, songId)
//     .then( (data) => {
//       console.log("song updated", data );
//       module.exports.loadSongsToDom();
//     });
//   });

//   $(document).on("click", ".save_new_btn", function() {
//     console.log("save btn clicked");
//     let songObj = buildSongObj();
//     db.addSong(songObj)
//     .then( (songId) => {
//       console.log("song saved", songId);
//       module.exports.loadSongsToDom();
//     });
//   });

//   $(document).on("click", ".delete-btn", function() {
//     let songId = $(this).data("delete-id");
//     db.deleteSong(songId)
//     .then( (song) => {
//       console.log("songDeleted", song );
//       module.exports.loadSongsToDom();
//     })
//     .catch( (err) => {
//       console.log("Song could not be deleted", err.statusText);
//     });
//   });
// };