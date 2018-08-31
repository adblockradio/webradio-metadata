// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

var get = require("../get.js");
let log = require("abr-log")("meta");

module.exports = function(exturl, callback) {
	get(exturl, function(err, result, corsEnabled) {
		if (err) {
			return callback(err, null, null);
		}

		var isHTTPS = exturl.slice(0,6) == "https";
		var coverPrefix = isHTTPS ? "https://nova.fr" : "http://nova.fr";

		try {
			parsedResult = JSON.parse(result);
			var curTrack = parsedResult["currentTrack"];
			if (curTrack) {
				var artist = curTrack["artist"];
				var title = curTrack["title"];
				var cover = coverPrefix + curTrack["image"];
			} else {
				var artist = parsedResult["radio"]["name"];
				var title = parsedResult["currentShow"] ? parsedResult["currentShow"]["title"] : "";
				var cover = coverPrefix + parsedResult["radio"]["image"];
			}
		} catch(e) {
			log.warn("France_Radio Nova: parsedResult=" + JSON.stringify(parsedResult));
			return callback(e.message, null, null);
		}
		return callback(null, { artist: artist, title: title, cover: cover }, corsEnabled);
	});
}
