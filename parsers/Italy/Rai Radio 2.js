// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

var get = require("../get.js");
const { log } = require("abr-log")("meta-Italy_Rai Radio 2");

module.exports = function(exturl, callback) {
	get(exturl, function(err, result, corsEnabled) {
		if (err) {
			return callback(err, null, null);
		}

		try {
			parsedResult = JSON.parse(result);
		} catch(e) {
			log.debug(result);
			return callback(e.message, null, null);
		}

		parsedResult = parsedResult["dirette"].filter(e => e.channel === "Rai Radio 2")[0]["currentItem"];

		//log.debug(JSON.stringify(parsedResult, null, "\t"));
		const artist = "Rai Radio 2";
		const title = parsedResult["name"];
		const cover = parsedResult["isPartOf"]["images"]["square"].replace("[RESOLUTION]", "350x350");

		return callback(null, { artist: artist, title: title, cover: cover }, corsEnabled);
	});
}
