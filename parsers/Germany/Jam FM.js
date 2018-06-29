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
		} catch(e) {
			console.log(result);
			return callback(e.message, null, null);
		}

		parsedResult = parsedResult.filter(e => e.name === "air")[0];
		parsedResult = parsedResult.playHistories[0].track;

		const artist = parsedResult.artist;
		const title = parsedResult.title;
		const cover = parsedResult.coverUrlMedium;

		return callback(null, { artist: artist, title: title, cover: cover }, corsEnabled);
	});
}
