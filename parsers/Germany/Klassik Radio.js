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
		parsedResult = parsedResult.nowPlaying[0];
		const artist = parsedResult.composer;
		const title = parsedResult.title;
		return { artist: artist, title: title };
	} catch (err) {
		return { error: err };
	}
}