var get = require("./get.js");

module.exports = function(exturl, callback) {
	get(exturl, function(err, result, corsEnabled) {
		if (err) {
			return callback(err, null, null);
		}

		try {
			parsedResult = JSON.parse(result);
			var curTrack = parsedResult["currentTrack"];
			var artist = curTrack["artist"];
			var title = curTrack["title"];
			var cover = "https://nova.fr" + curTrack["image"];
		} catch(e) {
			return callback(e.message, null, null);
		}
		return callback(null, { artist: artist, title: title, cover: cover }, corsEnabled);
	});
}
