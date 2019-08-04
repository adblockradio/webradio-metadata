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
		const now = +new Date();
		const meta = result.find(r => r.start <= now && now < r.end);
		return { artist: meta['singer'] , title: meta['title'], cover: meta['cover'] };
	} catch (err) {
		return { error: err };
	}
}