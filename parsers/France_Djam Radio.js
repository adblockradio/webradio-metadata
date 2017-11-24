var get = require("./get.js");

module.exports = function(exturl, callback) {
	get(exturl, function(err, result, corsEnabled) {
		if (err) {
			return callback(err, null, null);
		}

		try {
			parsedResult = JSON.parse(result);
			var curTrack = parsedResult["tracks"]["0"];
			var picture = curTrack["pictures"][0];
		} catch(e) {
			return callback(e.message, null, null);
		}
		return callback(null, { artist:curTrack["artist"], title:curTrack["title"], cover: picture }, corsEnabled);
	});
}
