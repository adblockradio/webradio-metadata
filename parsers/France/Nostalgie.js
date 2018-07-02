// Copyright (c) 2018 Alexandre Storelli
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
			var curTrack = parsedResult["itms"]["0"];
		} catch(e) {
			return callback(e.message, null, null);
		}
		return callback(null, { artist: curTrack["art"], title: curTrack["tit"], cover: "https://players.nrjaudio.fm/live-metadata/player/img/600x/" + curTrack["cov"] }, corsEnabled);
	});
}