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
			var curTrack = parsedResult["itms"]["0"];
		} catch(e) {
			return callback(e.message, null, null);
		}
		return callback(null, { artist: curTrack["art"], title: curTrack["tit"], cover: "https://players.nrjaudio.fm/live-metadata/player/img/600x/" + curTrack["cov"] }, corsEnabled);
	});
}