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
		var curTrack = parsedResult["itms"]["0"];
		return { artist: curTrack["art"], title: curTrack["tit"], cover: "https://players.nrjaudio.fm/live-metadata/player/img/600x/" + curTrack["cov"] };
	} catch (err) {
		return { error: err };
	}
}