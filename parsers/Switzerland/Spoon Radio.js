// Copyright (c) 2017 Alexandre Storelli
// This file is licensed under the Affero General Public License version 3 or later.
// See the LICENSE file.

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

			return callback(null, { artist: ro["NowPlaying"]["Current"][0]["Artist"][0], title: ro["NowPlaying"]["Current"][0]["Title"][0], cover: ro["NowPlaying"]["Current"][0]["Image"][0] });
		});
	});
}
