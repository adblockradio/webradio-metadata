// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

var get = require("../get.js");
const { log } = require("abr-log")("meta-France_RTL");

module.exports = function(exturl, callback) {
	get(exturl, function(err, result, corsEnabled) {

		if (err) {
			return callback(err, null, null);
		}

		try {
			parsedResult = JSON.parse(result);
		} catch(e) {
			log.debug(result);
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
