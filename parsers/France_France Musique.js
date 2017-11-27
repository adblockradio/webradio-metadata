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
		} catch(e) {
			return callback(e.message, null, null);
		}

		var now = Math.floor(new Date() / 1000);
		for (ip = 0; ip<parsedResult.length; ip++) {
			var item = parsedResult[ip];
			if (now >= item.start && now < item.end) {
				if (item["conceptParentTitle"]) {
					return callback(null, item["conceptParentTitle"] + " - " + item["conceptTitle"], corsEnabled);
				} else if (item["expressionTitle"]) {
					return callback(null, item["conceptTitle"] + " - " + item["expressionTitle"], corsEnabled);
				} else {
					return callback(null, item["conceptTitle"], corsEnabled);
				}
			}
		}
		return callback("program not found", null, null);
	});
}
