// Copyright (c) 2018 Alexandre Storelli
// This file is licensed under the Affero General Public License version 3 or later.
// See the LICENSE file.

var get = require("../get.js");

module.exports = function(exturl, callback) {
	get(exturl, function(err, result, corsEnabled) {
		if (err) {
			return callback(err, null, null);
		}

		try {
			parsedResult = JSON.parse(result);
		} catch(e) {
			console.log(result);
			return callback(e.message, null, null);
		}

		parsedResult = parsedResult["dirette"].filter(e => e.channel === "Rai Radio 1")[0]["currentItem"];

		//console.log(JSON.stringify(parsedResult, null, "\t"));
		const artist = "Rai Radio 1";
		const title = parsedResult["name"];
		const cover = parsedResult["isPartOf"]["images"]["square"].replace("[RESOLUTION]", "350x350");

		return callback(null, { artist: artist, title: title, cover: cover }, corsEnabled);
	});
}
