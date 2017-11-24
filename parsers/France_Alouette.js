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
		return callback(null, { artist: parsedResult["artiste"], title: parsedResult["titre"], cover: parsedResult["image_url"] }, corsEnabled);
	});
}
