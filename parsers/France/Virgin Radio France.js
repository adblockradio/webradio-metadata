// Copyright (c) 2017 Alexandre Storelli
// This file is licensed under the Affero General Public License version 3 or later.
// See the LICENSE file.

var get = require("../get.js");

module.exports = function(exturl, callback) {
	var now = new Date(+new Date() - 15*60*1000).toISOString().replace(/T/g, " ").replace(/Z/g, "").slice(0, 19);
	//console.log(exturl + now);
	get(exturl + now, function(err, result, corsEnabled) {
		//console.log("received");
		if (err) {
			return callback(err, null, null);
		}

		try {
			parsedResult = JSON.parse(result);
			var curTrack = parsedResult["root_tab"]["event"]["0"];
		} catch(e) {
			return callback(e.message, null, null);
		}

		return callback(null, { artist: curTrack["artist"].replace(/\|/g, ""), title: curTrack["title"], cover: curTrack["cover"] }, corsEnabled);

	});
}
