'use strict';
let firebase = require("./fbConfig");
let provider = new firebase.auth.GoogleAuthProvider();

//The function that's being called to log users in
module.exports.logInGoogle = () => {
	console.log("google");
	return firebase.auth().signInWithPopup(provider);
};


//The function that's being called to log users out
module.exports.logOutGoogle = () => {
	return firebase.auth().signOut().then(function() {
  console.log('Signed Out');
	}, function(error) {
  console.error('Sign Out Error', error);
	});
};