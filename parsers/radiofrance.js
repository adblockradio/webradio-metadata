var get = require("./get.js");

/*var cleanMeta = function(meta) {
	return meta.replace(/\+/g, " ").replace(/-/g, "").replace(/  +/g, " ").replace("(Edit OUI FM)", "").replace(/\[ \]/g, " ").replace(/"/g, "");
}*/

module.exports = function(exturl, callback) {
	get(exturl, function(err, result) {
		try {
			parsedResult = JSON.parse(result);
		} catch(e) {
			return callback(e.message, null);
		}

		var now = Math.floor(new Date() / 1000);
		for (ip = 0; ip<parsedResult.length; ip++) {
			var item = parsedResult[ip];
			if (now >= item.start && now < item.end) {
				if (item["conceptParentTitle"]) {
					return callback(null, item["conceptParentTitle"] + " - " + item["conceptTitle"]);
				} else if (item["expressionTitle"]) {
					return callback(null, item["conceptTitle"] + " - " + item["expressionTitle"]);
				} else {
					return callback(null, item["conceptTitle"]);
				}
			}
		}
		return callback("program not found", null);
	});
}
