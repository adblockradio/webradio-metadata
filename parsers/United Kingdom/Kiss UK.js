// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

"use strict";
const axios = require("axios");

module.exports = async function(exturl) {
	try {
		const req = await axios.get(exturl);
		const result = req.data;

		const b0 = "window.__PRELOADED_STATE__ = ";
		const i0 = result.indexOf(b0);
		let r = result.slice(i0+b0.length);

		const b1 = "</script>";
		const i1 = r.indexOf(b1);
		r = r.slice(0, i1).trim(); //.slice(0, -1); // -1 to remove the last semicolon

		let parsedResult = JSON.parse(r);

		if (!parsedResult["listenApi"] || !parsedResult["listenApi"]["data"]) {
			throw new Error("Kiss UK parsed Result does not have listenApi and/or data fields");
		}

		parsedResult = parsedResult["listenApi"]["data"];

		if (parsedResult["stationNowPlaying"] && parsedResult["stationNowPlaying"]["nowPlayingTrack"]) {
			var artist = parsedResult["stationNowPlaying"]["nowPlayingArtist"];
			var title = parsedResult["stationNowPlaying"]["nowPlayingTrack"];
			var cover = parsedResult["stationNowPlaying"]["nowPlayingImage"];
		} else {
			var artist = "Kiss UK";
			var title = parsedResult["stationOnAir"]["episodeTitle"];
			var cover = parsedResult["stationOnAir"]["episodeImageUrl"];
		}

		return { artist: artist, title: title, cover: cover };

	} catch (err) {
		return { error: err };
	}
}