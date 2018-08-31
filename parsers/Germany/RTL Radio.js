// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

var get = require("../get.js");

module.exports = function(exturl, callback) {
	get(exturl, function(err, result, corsEnabled) {
		if (err) {
			return callback(err, null, null);
		}

		const b1 = "radioplayer.playing.receive(";
		const b2 = ")";

		try {
			var r = result.slice(b1.length, result.length - b2.length);
			parsedResult = JSON.parse(r)["results"]["196"];
			//console.log(JSON.stringify(parsedResult, null, "\t"));

			var curTrack = parsedResult.filter(e => e.type === "PE_E");
			if (curTrack[0]) {
				var artist = curTrack[0]["artistName"];
				var title = curTrack[0]["name"];
				var cover = curTrack[0]["imageUrl"];
			} else {
				var backup = parsedResult.filter(e => e.type === "SI")[0];
				artist = "RTL";
				title = "Deutschlands Hit-Radio";
				cover = backup["imageUrl"];
			}
		} catch(e) {
			console.log(r);
			return callback(e.message, null, null);
		}
		return callback(null, { artist: artist, title: title, cover: cover }, corsEnabled);
	});
}