// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

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
