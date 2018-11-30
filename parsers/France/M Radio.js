// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

"use strict";
const parseString = require('xml2js').parseString;
const axios = require("axios");
//const { log } = require("abr-log")("Meta-M Radio");

module.exports = async function(exturl) {
	try {
		const req = await axios.get(exturl);
		const result = req.data;

		return await new Promise(function(resolve, reject) {
			parseString(result, function (err, ro) {
				if (err || !ro || !ro.prog) {
					return reject("parsing error: " + err);
				}
				//log.debug(JSON.stringify(ro.prog.morceau[0], null, '\t'));
				var parsed = ro.prog.morceau[0];
				if (parsed) {
					return resolve({ artist: parsed["chanteur"][0], title: parsed["chanson"][0], cover: parsed["pochette"][0] });
				} else {
					return reject("M Radio parsing error");
				}
			});
		})

	} catch (err) {
		return { error: err };
	}
}
