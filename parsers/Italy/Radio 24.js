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
		const artist = parsedResult["conduttoriList"];
		const title = parsedResult["label"];
		const cover = "http://www.radio24.ilsole24ore.com" + parsedResult["foto"]["fotohome2T2"]["@value"];
		return { artist: artist, title: title, cover: cover };
	} catch (err) {
		return { error: err };
	}
}