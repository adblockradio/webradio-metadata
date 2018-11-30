// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

"use strict";
const axios = require("axios");

module.exports = async function(exturl) {
	try {
		const req = await axios.get(exturl);
		const parsedResult = req.data;

		const isHTTPS = exturl.slice(0,6) == "https";
		const coverPrefix = isHTTPS ? "https://nova.fr" : "http://nova.fr";
		let artist, title, cover;
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
		return { artist: artist, title: title, cover: cover };

	} catch (err) {
		return { error: err };
	}
}