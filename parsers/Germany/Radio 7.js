// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

var get = require("../get.js");
const { log } = require("abr-log")("meta-Germany_Radio 7");

module.exports = function(exturl, callback) {
	get(exturl, function(err, result, corsEnabled) {

		if (err) {
			return callback(err, null, null);
		}

		try {
			var parsedResult = JSON.parse(result);
			parsedResult = parsedResult[8]; //.filter(e => e.stream === "Radio 7 Digital")[0];
		} catch(e) {
			log.debug(result);
			return callback(e.message, null, null);
		}

		const artist = parsedResult["artist_name"];
		const title = parsedResult["song_title"];
		const cover = parsedResult["covers"]["cover_art_url_xl"];

		return callback(null, { artist: artist, title: title, cover: cover }, corsEnabled);
	});
}
