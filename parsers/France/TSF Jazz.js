// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

"use strict";
const axios = require("axios");

module.exports = async function(exturl) {
	try {
		const req = await axios.get(exturl);
		if (!req.data || !req.data.artist || !req.data.title) {
			return { artist: "TSF Jazz", title: "TSF Jazz" }
		} else {
			return { artist: req.data.artist, title: req.data.title, cover: req.data.thumbnail_medium };
		}
	} catch (err) {
		return { error: err };
	}
}