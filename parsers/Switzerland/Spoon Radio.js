// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

"use strict";
const axios = require("axios");
const parseString = require('xml2js').parseString;

module.exports = async function(exturl) {
	try {
		const req = await axios.get(exturl);
		const result = req.data;
		return await new Promise(function(resolve, reject) {
			parseString(result, function (err, ro) {
				if (err) {
					return reject("Spoon Radio parsing error=" + err);
				} else if (!ro || !ro["NowPlaying"] || !ro["NowPlaying"] || !ro["NowPlaying"]["Current"] || !ro["NowPlaying"]["Current"][0]) {
					return reject("Spoon Radio did not find now playing element.");
				} else {
					return resolve({
						artist: ro["NowPlaying"]["Current"][0]["Artist"][0],
						title: ro["NowPlaying"]["Current"][0]["Title"][0],
						cover: ro["NowPlaying"]["Current"][0]["Image"][0]
					});
				}
			});
		});

	} catch (err) {
		return { error: err };
	}
}
