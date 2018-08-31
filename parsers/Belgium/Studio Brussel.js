// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

var get = require("../get.js");
const htmlToStr = require("../htmlToStr.js");

module.exports = function(exturl, callback) {
	get(exturl, function(err, result, corsEnabled) {
		if (err) {
			return callback(err, null, null);
		}

		try {
			parsedResult = JSON.parse(decodeURI(result))["onairs"];
			//console.log(JSON.stringify(parsedResult, null, "\t"));
			parsedResult = parsedResult.filter(e => e.onairType === "NOW");
		} catch(e) {
			return callback(e.message, null, null);
		}

		if (parsedResult.length && parsedResult[0]["properties"]) {
			//console.log("music");
			const p = parsedResult[0]["properties"];
			const artist = p.filter(e => e.key === "ARTISTNAME")[0].value.trim();
			const title = p.filter(e => e.key === "TITLE")[0].value.trim();
			return callback(null, { artist: artist, title: title }, corsEnabled);

		} else {
			//console.log("no music");
			get("https://services.vrt.be/epg/onair?channel_code=41&accept=" + encodeURIComponent("application/vnd.epg.vrt.be.onairs_1.0+json"), function(err, stdout, corsEnabled) {
				try {
					parsedResult = JSON.parse(stdout);
					parsedResult = parsedResult["onairs"][0]["now"];
				} catch(e) {
					console.log(stdout);
					return callback(e.message, null, null);
				}
				//console.log(JSON.stringify(parsedResult, null, "\t"));
				let artist, title;
				if (!parsedResult.presenters.length) {
					artist = parsedResult.title;
					title = parsedResult.shortDescription;
				} else {
					artist = parsedResult.presenters[0].name;
					title = parsedResult.title;
				}
				//const artist = parsedResult.presenters[0].name;
				//const title = parsedResult.title;

				return callback(null, { artist: artist, title: title }, corsEnabled);

			});
		}
		const artist = parsedResult.filter(e => e.key === "ARTISTNAME")["value"];
		const title = parsedResult.filter(e => e.key === "TITLE")["value"];

	});
}