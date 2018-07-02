// Copyright (c) 2018 Alexandre Storelli
// This file is licensed under the Affero General Public License version 3 or later.
// See the LICENSE file.

var get = require("../get.js");

module.exports = function(exturl, callback) {
	get(exturl, function(err, result, corsEnabled) {
		if (err) {
			return callback(err, null, null);
		}

		const b1 = "radioplayer.playing.receive(";
		const b2 = ")";

		try {
			parsedResult = JSON.parse(result.slice(b1.length, result.length - b2.length));
			//console.log(JSON.stringify(parsedResult, null, "\t"));
			var curTrack = parsedResult["results"]["196"].filter(e => e.type === "PE_E")[0];
		} catch(e) {
			return callback(e.message, null, null);
		}
		return callback(null, { artist: curTrack["artistName"], title: curTrack["name"], cover: curTrack["imageUrl"] }, corsEnabled);
	});
}