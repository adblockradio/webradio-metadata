// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

var get = require("../get.js");

module.exports = function(exturl, callback) {
	get(exturl, function(err, result, corsEnabled) {
		if (err) {
			return callback(err, null, null);
		}

		try {
			parsedResult = JSON.parse(result);
			var curTrack = parsedResult["current"];
			if (curTrack["artist"] && curTrack["artist"][curTrack["artist"].length-1] == "|") {
				curTrack["artist"] = curTrack["artist"].slice(0, -1);
			}
			return callback(null, { artist: curTrack["artist"], title: curTrack["title"], cover: curTrack["cover"] }, corsEnabled);
		} catch(e) {
			return callback(e.message, null, null);
		}
	});
}
