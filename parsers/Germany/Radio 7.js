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
			var parsedResult = JSON.parse(result);
			parsedResult = parsedResult[8]; //.filter(e => e.stream === "Radio 7 Digital")[0];
		} catch(e) {
			console.log(result);
			return callback(e.message, null, null);
		}

		const artist = parsedResult["artist_name"];
		const title = parsedResult["song_title"];
		const cover = parsedResult["covers"]["cover_art_url_xl"];

		return callback(null, { artist: artist, title: title, cover: cover }, corsEnabled);
	});
}
