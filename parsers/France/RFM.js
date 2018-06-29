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
			var curTrack = parsedResult["current"];
		} catch(e) {
			return callback(e.message, null, null);
		}
		if (curTrack["artist"] && curTrack["artist"][curTrack["artist"].length-1] == "|") {
			curTrack["artist"] = curTrack["artist"].slice(0, -1);
		}
		return callback(null, { artist: curTrack["artist"], title: curTrack["title"], cover: curTrack["cover"] }, corsEnabled);
	});
}
