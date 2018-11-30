// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

"use strict";

const axios = require("axios");
const qs = require("qs");
//const { log } = require("abr-log")("meta-Djam Radio");

module.exports = async function(exturl) {
	try {
		const req = await axios({
			method: 'POST',
			url: exturl,
			data : qs.stringify({
				origin: 'website'
			}),
			headers: {
				'Accept': 'application/json, text/javascript, */*; q=0.01',
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		}});
		const parsedResult = req.data;
		const curTrack = parsedResult["tracks"]["0"];
		const picture = curTrack["pictures"][0];
		return { artist:curTrack["artist"], title:curTrack["title"], cover: picture };
	} catch (err) {
		return { error: err };
	}
}