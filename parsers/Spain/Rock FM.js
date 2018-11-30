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
		parsedResult = JSON.parse(decodeURI(parsedResult.value));

		const artist = decodeURIComponent(parsedResult.author);
		const title = decodeURIComponent(parsedResult.title);

		const exturl2 = "http://player.rockfm.fm/rdsrock.php";
		const req2 = await axios.get(exturl2);
		const result2 = req2.data;
		const b1 = "@";
		const i1 = result2.indexOf(b1);
		const r1 = result2.slice(i1 + b1.length);
		const cover = "http://player.rockfm.fm/xml/img/" + r1;
		return { artist: artist, title: title, cover: cover };

	} catch (err) {
		return { error: err };
	}
}