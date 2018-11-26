// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

const { exec } = require('child_process');
const { log } = require("abr-log")("meta-France_Europe 1");

module.exports = function(exturl, callback) {

	exec("curl -H 'Accept: application/json, text/javascript, */*; q=0.01' --compressed -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' --data 'origin=website' " + exturl, (error, stdout, stderr) => {
		if (error) {
			return callback(error, null, null);
		}

		try {
			parsedResult = JSON.parse(stdout);
			var curTrack = parsedResult["tracks"]["0"];
			var picture = curTrack["pictures"][0];
		} catch(e) {
			return callback(e.message, null, null);
		}
		return callback(null, { artist:curTrack["artist"], title:curTrack["title"], cover: picture }, false);
	});
}
