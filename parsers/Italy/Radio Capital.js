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
			parsedResult = JSON.parse(result)["result"];
		} catch(e) {
			console.log(result);
			return callback(e.message, null, null);
		}

		//console.log(JSON.stringify(parsedResult, null, "\t"));
		const artist = parsedResult.artist;
		const title = parsedResult.title;
		const cover = parsedResult.coverUrl;

		return callback(null, { artist: artist, title: title, cover: cover }, corsEnabled);
	});
}
