// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

var get = require("../get.js");
const { log } = require("abr-log")("meta-France_Virgin Radio");

module.exports = function(exturl, callback) {
	var now = new Date(+new Date() - 15*60*1000).toISOString().replace(/T/g, " ").replace(/Z/g, "").slice(0, 19);
	//log.debug(exturl + now);
	get(exturl + now, function(err, result, corsEnabled) {
		//log.debug("received");
		if (err) {
			return callback(err, null, null);
		}

		try {
			parsedResult = JSON.parse(result);
			var curTrack = parsedResult["root_tab"]["event"]["0"];
		} catch(e) {
			return callback(e.message, null, null);
		}

		return callback(null, { artist: curTrack["artist"].replace(/\|/g, ""), title: curTrack["title"], cover: curTrack["cover"] }, corsEnabled);

	});
}
