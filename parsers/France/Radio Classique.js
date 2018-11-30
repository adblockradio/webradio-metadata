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
		const artist = parsedResult["auteur"].replace(/:/g, " ").trim();
		const title = parsedResult["titre"].replace(/\%\\n/g, " ").trim(); //.replace(/\\n/g, " - ")
		return { arstist: artist, title: title };

	} catch (err) {
		return { error: err };
	}
}

// TODO
// to get cover, parse rc_composers list from https://www.radioclassique.fr/radio/direct/