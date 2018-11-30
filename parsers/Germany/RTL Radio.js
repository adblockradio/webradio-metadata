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
		const b1 = "radioplayer.playing.receive(";
		const b2 = ")";

		var r = result.slice(b1.length, result.length - b2.length);
		const parsedResult = JSON.parse(r)["results"]["196"];
		//log.debug(JSON.stringify(parsedResult, null, "\t"));

		const curTrack = parsedResult.filter(e => e.type === "PE_E");
		if (curTrack[0]) {
			var artist = curTrack[0]["artistName"];
			var title = curTrack[0]["name"];
			var cover = curTrack[0]["imageUrl"];
		} else {
			var backup = parsedResult.filter(e => e.type === "SI")[0];
			artist = "RTL";
			title = "Deutschlands Hit-Radio";
			cover = backup["imageUrl"];
		}
		return { artist: artist, title: title, cover: cover };
	} catch (err) {
		return { error: err };
	}
}