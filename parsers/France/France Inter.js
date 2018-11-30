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
		const now = Math.floor(new Date() / 1000);
		for (let ip = parsedResult.length - 1; ip >= 0; ip--) {
			const item = parsedResult[ip];
			if (now < item.end && (now >= item.start || (ip > 0 && now >= parsedResult[ip-1].end))) {
				let artist = null;
				if (item["conceptParentTitle"]) {
					artist = item["conceptParentTitle"];
				}
				let title = item["conceptTitle"];
				if (title.indexOf(item["expressionTitle"]) < 0 && item["expressionTitle"].indexOf(title) < 0) {
					if (artist == null) {
						artist = title;
						title = item["expressionTitle"];
					} else {
						title += " - " + item["expressionTitle"];
					}
				}
				const cover = (item["visual"] && item["visual"]["imgUrl"]) ? item["visual"]["imgUrl"] : null;
				return { artist: artist, title: title, cover: cover };
			}
		}
		return { error: "program not found at time stamp " + now };
	} catch (err) {
		return { error: err };
	}
}