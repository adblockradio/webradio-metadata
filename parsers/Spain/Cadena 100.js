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
		const artist1 = parsedResult.author;
		const title1 = parsedResult.title;

		const exturl2 = "http://apih.cadena100.es/v1.0/music.track_info_bytitle/?&str=" + encodeURIComponent(artist1) + " %2F " + encodeURIComponent(title1) + "&type=big";
		const req2 = await axios.get(exturl2);
		const parsedResult2 = req2.data;
		const artist = parsedResult2.artist;
		const title = parsedResult2.title;
		const cover = parsedResult2.extraTrack ? parsedResult2.extraTrack.cover : "";

		return { artist: artist, title: title, cover: cover };
	} catch (err) {
		return { error: err };
	}
}