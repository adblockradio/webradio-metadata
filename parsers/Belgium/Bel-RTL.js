// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

var get = require("../get.js");
const htmlToStr = require("../htmlToStr.js");
//const { exec } = require("child_process");

module.exports = function(exturl, callback) {
	get(exturl, function(err, result, corsEnabled) {

		if (err) {
			return callback(err, null, null);
		}

		try {
			parsedResult = JSON.parse(htmlToStr(result));
			const now = new Date();
			parsedResult = parsedResult.items;
			parsedResult = parsedResult.filter(e => (now >= new Date(e.datetime)) && (now < new Date(+new Date(e.datetime) + Number(e.duration) * 60000)))[0];
		} catch(e) {
			console.log(result);
			return callback(e.message, null, null);
		}

		const artist = "Bel RTL";
		const title = parsedResult.title;
		const cover = "https:" + parsedResult.image;

		return callback(null, { artist: artist, title: title, cover: cover }, corsEnabled);
	});

	/*
	Metadata with songs names is a bit complex and needs cookie headers to work.
	let exturl = "https://belrtl.ice.infomaniak.ch/metadata?type=json&cb=58761570037";
	exec("curl '" + exturl + "' --compressed -H 'Cookie: AISSessionId=5a4f31406ed1d34c_15394354_TI8hJRPc_MTg1Ljc0LjcwLjk!_000000aAkw6'", (error, stdout, stderr) => {
		if (error) {
			console.error(`exec error: ${error}`);
			return callback(error, null, null);
		}

		try {
			parsedResult = JSON.parse(stdout);
			parsedResult = parsedResult["metadata-list"][0]["metadata"];
		} catch(e) {
			console.log(result);
			return callback(e.message, null, null);
		}

		console.log(parsedResult);
	});
	*/
}