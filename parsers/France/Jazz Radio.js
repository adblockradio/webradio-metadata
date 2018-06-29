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
			var stations = ro.prog.station;
			for (var i=0; i<stations.length; i++) {
				try {
					if (stations[i]["$"]["id"] == "0") {
						//console.dir(stations[i]);
						return callback(null, { artist: stations[i].morceau[0].chanteur[0], title: stations[i].morceau[0].chanson[0], cover: stations[i].morceau[0].pochette[0] }, corsEnabled);
					}
				} catch(e) {
					return callback(e.message, null, null);
				}
			}
		});
	});
}
