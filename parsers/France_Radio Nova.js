var get = require("./get.js");

module.exports = function(exturl, callback) {
	get(exturl, function(err, result) {
		try {
			parsedResult = JSON.parse(result);
		} catch(e) {
			return callback(e.message, null);
		}
		//console.log(parsedResult);
		var curTrack = parsedResult["currentTrack"];
		if (!curTrack) {
			return callback(null, parsedResult["radio"]["name"]);
		} else {
			return callback(null, curTrack["artist"] + " - " + curTrack["title"]);
		}

	});
}
