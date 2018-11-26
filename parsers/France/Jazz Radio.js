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
			if (err || !ro || !ro.prog) {
				return callback(err, null, null);
			}
			try {
				var stations = ro.prog.station;
				for (var i=0; i<stations.length; i++) {
					if (stations[i]["$"]["id"] == "0") {
						//console.dir(stations[i]);
						return callback(null, { artist: stations[i].morceau[0].chanteur[0], title: stations[i].morceau[0].chanson[0], cover: stations[i].morceau[0].pochette[0] }, corsEnabled);
					}
				}
				return callback("station not found", null, null);
			} catch(e) {
				return callback(e.message, null, null);
			}
		});
	});
}
