// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

"use strict";
const axios = require("axios");

module.exports = async function(exturl) {
	try {
		const now = new Date(+new Date() - 15*60*1000).toISOString().replace(/T/g, " ").replace(/Z/g, "").slice(0, 19);
		const req = await axios.get(exturl + now);
		let parsedResult = req.data;
		let curTrack = parsedResult["root_tab"]["event"]["0"];

		if (!curTrack) {
			//log.debug("first URL did not contain useful data");
			const result2 = await axios.get("https://www.virginradio.fr/calendar/api/current.json");
			parsedResult = result2.data;
			curTrack = parsedResult["root_tab"]["events"]["0"];
			return { artist: "Virgin Radio", title: curTrack["title"] };
		} else {
			return { artist: curTrack["artist"].replace(/\|/g, ""), title: curTrack["title"], cover: curTrack["cover"] };
		}

	} catch (err) {
		return { error: err };
	}
}