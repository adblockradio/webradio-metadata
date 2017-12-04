// Copyright (c) 2017 Alexandre Storelli
// This file is licensed under the Affero General Public License version 3 or later.
// See the LICENSE file.

var get = require("./get.js");

module.exports = function(exturl, callback) {
	get(exturl, function(err, result, corsEnabled) {
		if (err) {
			return callback(err, null, null);
		}

		try {
			parsedResult = JSON.parse(result);
			var curTrack = parsedResult["currentTrack"];
			if (curTrack) {
				var artist = curTrack["artist"];
				var title = curTrack["title"];
				var cover = "https://nova.fr" + curTrack["image"];
			} else {
				var artist = parsedResult["radio"]["name"];
				var title = parsedResult["currentShow"]["title"];
				var cover = "https://nova.fr" + parsedResult["radio"]["image"];
			}
		} catch(e) {
			console.log(JSON.stringify(parsedResult));
			return callback(e.message, null, null);
		}
		return callback(null, { artist: artist, title: title, cover: cover }, corsEnabled);
	});
}
