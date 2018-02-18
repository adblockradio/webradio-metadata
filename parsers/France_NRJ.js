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

		var artist = parsedResult.itms[0].art;
		var title = parsedResult.itms[0].tit;
		var cover = "http://players.nrjaudio.fm/live-metadata/player/img/600x/" + parsedResult.itms[0].cov;

		return callback(null, { artist: artist, title: title, cover: cover }, corsEnabled);
	});
}
