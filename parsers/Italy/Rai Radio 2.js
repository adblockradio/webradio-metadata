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
		parsedResult = parsedResult["dirette"].filter(e => e.channel === "Rai Radio 2")[0]["currentItem"];

		//log.debug(JSON.stringify(parsedResult, null, "\t"));
		const artist = "Rai Radio 2";
		const title = parsedResult["name"];
		const cover = parsedResult["isPartOf"]["images"]["square"].replace("[RESOLUTION]", "350x350");

		return { artist: artist, title: title, cover: cover };
	} catch (err) {
		return { error: err };
	}
}