// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

"use strict";
const axios = require("axios");

module.exports = async function(exturl) {
	try {
		const req = await axios.get(exturl);
		const parsedResult = req.data["onairs"].filter(e => e.onairType === "NOW");

		if (parsedResult.length && parsedResult[0]["properties"]) {
			//log.debug("music");
			const p = parsedResult[0]["properties"];
			const artist = p.filter(e => e.key === "ARTISTNAME")[0].value.trim();
			const title = p.filter(e => e.key === "TITLE")[0].value.trim();
			return { artist: artist, title: title };
		}

		const req2 = await axios.get("https://services.vrt.be/epg/onair?channel_code=41&accept=" + encodeURIComponent("application/vnd.epg.vrt.be.onairs_1.0+json"));
		const parsedResult2 = req2.data["onairs"][0]["now"];

		//log.debug(JSON.stringify(parsedResult2, null, "\t"));
		let artist, title;
		if (!parsedResult2.presenters.length) {
			artist = parsedResult2.title;
			title = parsedResult2.shortDescription;
		} else {
			artist = parsedResult2.presenters[0].name;
			title = parsedResult2.title;
		}
		return { artist: artist, title: title };

	} catch (err) {
		return { error: err };
	}
}