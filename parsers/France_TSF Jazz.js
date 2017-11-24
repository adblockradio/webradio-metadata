var get = require("./get.js");

module.exports = function(exturl, callback) {
	get(exturl, function(err, result, corsEnabled) {
		if (err) {
			return callback(err, null, null);
		}
		var split = result.split("|");
		return callback(null, { artist: split[0], title: split[1] }, corsEnabled);
	});
}
