// Copyright (c) 2017 Alexandre Storelli
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
			//var curTrack = parsedResult["currentTrack"];
		} catch(e) {
			return callback(e.message, null, null);
		}

		// get program
		var meta1 = parsedResult["on_air_program"].title;
		var presenter = parsedResult["on_air_program"]["presenters"][0]["name"];
		var cover = parsedResult["on_air_program"]["cover_uri"];

		// get music title, if any
		var records = parsedResult.schedule;
		var now = Math.round(+new Date()/1000); // epoch
		for (var i=0; i<records.length; i++) {
			if (records[i].info["start_ts"] < now && records[i].info["end_ts"] > now) {
				return callback(null, { artist:records[i].artists[0].name, title:records[i].info["title"], cover: records[i].info["cover_uri"] }, corsEnabled);
				//console.log()
			}
		}
		return callback(null, { artist: presenter, title:meta1, cover: cover }, corsEnabled);
	});
}
