var get = require("./get.js");

/*var cleanMeta = function(meta) {
	return meta.replace(/\+/g, " ").replace(/-/g, "").replace(/  +/g, " ").replace("(Edit OUI FM)", "").replace(/\[ \]/g, " ").replace(/"/g, "");
}*/

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
		if (parsedResult["code"] === "success") {
			return callback(null, parsedResult["results"]["title_str"], corsEnabled);
		} else {
			//console.log(result);
			return callback(parsedResult["message"], null, corsEnabled);
		}
	});
}
