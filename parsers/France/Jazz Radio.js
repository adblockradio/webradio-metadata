// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

"use strict";
const parseString = require('xml2js').parseString;
const axios = require("axios");

module.exports = async function(exturl) {
	try {
		const req = await axios.get(exturl);
		const result = req.data;

		return await new Promise(function(resolve, reject) {
			parseString(result, function (err, ro) {
				if (err || !ro || !ro.prog) {
					return reject(err);
				}
				try {
					var stations = ro.prog.station;
					for (var i=0; i<stations.length; i++) {
						if (stations[i]["$"]["id"] == "0") {
							//console.dir(stations[i]);
							return resolve({ artist: stations[i].morceau[0].chanteur[0], title: stations[i].morceau[0].chanson[0], cover: stations[i].morceau[0].pochette[0] });
						}
					}
					return reject("station not found");
				} catch(e) {
					return reject(e.message);
				}
			});
		})

	} catch (err) {
		return { error: err };
	}
}