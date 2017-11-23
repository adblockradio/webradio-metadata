var get = require("./get.js");

module.exports = function(exturl, callback) {
	get(exturl, function(err, result, corsEnabled) {
		if (err) {
			return callback(err, null, null);
		}
		
		try {
			parsedResult = JSON.parse(result);
		} catch(e) {
			return callback(e.message, null, null);
		}
		//console.log(parsedResult);
		var curTrack = parsedResult["currentTrack"];
		if (!curTrack) {
			return callback(null, parsedResult["radio"]["name"], corsEnabled);
		} else {
			return callback(null, curTrack["artist"] + " - " + curTrack["title"], corsEnabled);
		}

	});
}
