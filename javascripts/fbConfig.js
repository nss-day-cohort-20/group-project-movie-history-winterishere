'use strict';
// uses fb and getter --> api key
let firebase = require('firebase/app');
let fbData = require("./fbGetter")();

// uses firebase auth for users
require("firebase/auth");

// sets the key value pairs from fbGetter to config
let config = {
	apiKey: fbData.key,
	authDomain: fbData.authDomain
};

firebase.initializeApp(config);

module.exports = firebase;