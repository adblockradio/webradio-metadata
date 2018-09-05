// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

"use strict";

const get = require("../get.js");
const { log } = require("abr-log")("meta-France_Radio Nova");

module.exports = function(exturl, callback) {
	get(exturl, function(err, result, corsEnabled) {
		if (err) {
			return callback(err, null, null);
		}

		const isHTTPS = exturl.slice(0,6) == "https";
		const coverPrefix = isHTTPS ? "https://nova.fr" : "http://nova.fr";
		let artist, title, cover, parsedResult;

		try {
			parsedResult = JSON.parse(result);
			const curTrack = parsedResult["currentTrack"];
			if (curTrack) {
				artist = curTrack["artist"];
				title = curTrack["title"];
				cover = coverPrefix + curTrack["image"];
			} else {
				artist = parsedResult["radio"]["name"];
				title = parsedResult["currentShow"] ? parsedResult["currentShow"]["title"] : "";
				cover = coverPrefix + parsedResult["radio"]["image"];
			}
		} catch(e) {
			log.warn("France_Radio Nova: parsedResult=" + JSON.stringify(parsedResult));
			return callback(e.message, null, null);
		}
		return callback(null, { artist: artist, title: title, cover: cover }, corsEnabled);
	});
}
