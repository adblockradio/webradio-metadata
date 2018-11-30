// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

"use strict";
const axios = require("axios");

module.exports = async function(exturl) {
	try {
		const req = await axios.get(exturl);
		let parsedResult = req.data;
		parsedResult = parsedResult.filter(e => e.name === "air")[0];
		parsedResult = parsedResult.playHistories[0].track;

		const artist = parsedResult.artist;
		const title = parsedResult.title;
		const cover = parsedResult.coverUrlMedium;

		return { artist: artist, title: title, cover: cover };
	} catch (err) {
		return { error: err };
	}
}