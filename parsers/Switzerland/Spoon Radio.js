// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

var parseString = require('xml2js').parseString;
var get = require("../get.js");

module.exports = function(exturl, callback) {
	get(exturl, function(err, result, corsEnabled) {
		if (err) {
			return callback(err, null, null);
		}

		parseString(result, function (err, ro) {
			if (err) {
				return callback(err, null, null);
			}
			try {
				return callback(null, { artist: ro["NowPlaying"]["Current"][0]["Artist"][0], title: ro["NowPlaying"]["Current"][0]["Title"][0], cover: ro["NowPlaying"]["Current"][0]["Image"][0] });
			} catch(e) {
				return callback(e.message, null, null);
			}
		});
	});
}
