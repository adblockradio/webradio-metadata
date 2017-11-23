var get = require("./get.js");

module.exports = function(exturl, callback) {
	get(exturl, function(err, result, corsEnabled) {
		try {
			parsedResult = JSON.parse(result);
		} catch(e) {
			return callback(e.message, null, null);
		}
		return callback(null, parsedResult["title"] + " - " + parsedResult["baseline"], corsEnabled);
	});
}
