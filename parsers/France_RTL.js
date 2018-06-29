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
			console.log(result);
			return callback(e.message, null, null);
		}

		const b1 = "Présenté par : "
		let i1 = parsedResult.desc.indexOf(b1);
		if (i1 >= 0) {
			var artist = parsedResult.desc.slice(b1.length);
		} else {
			artist = parsedResult.desc;
		}

		const title = parsedResult.title;
		const cover = parsedResult.imageUrl;

		return callback(null, { artist: artist, title: title, cover: cover }, corsEnabled);
	});
}
