// Copyright (c) 2017 Alexandre Storelli
// This file is licensed under the Affero General Public License version 3 or later.
// See the LICENSE file.

var get = require("../get.js");

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

		var curTrack = parsedResult.steps[parsedResult.levels["0"].items[parsedResult.levels["0"].position]];
		//console.log(curTrack);
		if (!curTrack) {
			return callback("parsing problem", parsedResult["radio"]["name"], corsEnabled);
		} else {
			return callback(null, { artist: curTrack["authors"], title: curTrack["title"], cover: curTrack["visual"] }, corsEnabled);
		}

	});
}
