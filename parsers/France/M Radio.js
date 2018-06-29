// Copyright (c) 2017 Alexandre Storelli
// This file is licensed under the Affero General Public License version 3 or later.
// See the LICENSE file.

var parseString = require('xml2js').parseString;
var get = require("../get.js");

module.exports = function(exturl, callback) {
	get(exturl + (+new Date()), function(err, result, corsEnabled) {
		if (err) {
			return callback(err, null, null);
		}

		parseString(result, function (err, ro) {
			if (err) {
				return callback(err, null, null);
			}
			var parsed = ro.prog.morceau[0];
			return callback(null, { artist: parsed.chanteur[0], title: parsed.chanson[0], cover: parsed.pochette[0] }, corsEnabled);
		});
	});
}
