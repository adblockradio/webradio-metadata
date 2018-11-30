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
		let curTrack = parsedResult["current"];
		if (curTrack["artist"] && curTrack["artist"][curTrack["artist"].length-1] == "|") {
			curTrack["artist"] = curTrack["artist"].slice(0, -1);
		}
		return { artist: curTrack["artist"], title: curTrack["title"], cover: curTrack["cover"] };
	} catch (err) {
		return { error: err };
	}
}