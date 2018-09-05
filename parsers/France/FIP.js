// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

var get = require("../get.js");
const { log } = require("abr-log")("meta-France_FIP");


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

		var curTrack = parsedResult.steps[parsedResult.levels["0"].items[parsedResult.levels["0"].position]];
		//log.debug(curTrack);
		if (!curTrack) {
			return callback("parsing problem", parsedResult["radio"]["name"], corsEnabled);
		} else {
			return callback(null, { artist: curTrack["authors"], title: curTrack["title"], cover: curTrack["visual"] }, corsEnabled);
		}

	});
}
