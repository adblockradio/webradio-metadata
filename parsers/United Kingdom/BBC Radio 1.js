// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

var get = require("../get.js");
const { log } = require("abr-log")("meta-United Kingdom_BBC Radio 1");

// doc available at https://rms.api.bbc.co.uk/docs/swagger.json#/definitions/PlayableItemsResponse

module.exports = function(name) {
	return function(exturl, callback) {
		get(exturl, function(err, result, corsEnabled) {
			if (err) {
				return callback(err, null, null);
			}

			try {
				parsedResult = JSON.parse(result);

				const data = parsedResult.data.filter(r => r.availability.label === 'Now Playing');
				if (!data.length) return callback(null, { artist: 'BBC', title: name, cover: null }, corsEnabled);

				const artist = data[0]['titles']['secondary'];
				const title = data[0]['titles']['primary'];

				return callback(null, {
					artist: artist,
					title: title,
					cover: data[0]['image_url'] && data[0]['image_url'].replace('{recipe}', '320x320')
				});
			} catch(e) {
				log.debug(result);
				return callback(e.message, null, null);
			}

			/*parsedResult = parsedResult["modules"];
			parsedResult = parsedResult.filter(e => e.id === "listen_live")[0]["items"];
			parsedResult = parsedResult.filter(e => e.id === "bbc_radio_one")[0];
			//log.debug(JSON.stringify(parsedResult, null, "\t"));

			const artist = parsedResult["titles"]["primary"];
			const title = parsedResult["titles"]["secondary"];
			const cover = parsedResult["image_url"].replace("{recipe}", "304x304");

			return callback(null, { artist: artist, title: title, cover: cover }, corsEnabled);*/
		});
	};
}
