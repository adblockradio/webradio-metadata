// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

"use strict";
const axios = require("axios");

// doc available at https://rms.api.bbc.co.uk/docs/swagger.json#/definitions/PlayableItemsResponse

module.exports = function(name) {
	return async function(exturl) {
		try {
			const req = await axios.get(exturl);
			const parsedResult = req.data;

			const data = parsedResult.data.filter(r => r.availability.label === 'Now Playing');
			if (!data.length) return { artist: 'BBC', title: name };

			const artist = data[0]['titles']['secondary'];
			const title = data[0]['titles']['primary'];

			return {
				artist: artist,
				title: title,
				cover: data[0]['image_url'] && data[0]['image_url'].replace('{recipe}', '320x320')
			};

		} catch (err) {
			return { error: err };
		}
	}
}

/*parsedResult = parsedResult["modules"];
parsedResult = parsedResult.filter(e => e.id === "listen_live")[0]["items"];
parsedResult = parsedResult.filter(e => e.id === "bbc_radio_one")[0];
//log.debug(JSON.stringify(parsedResult, null, "\t"));

const artist = parsedResult["titles"]["primary"];
const title = parsedResult["titles"]["secondary"];
const cover = parsedResult["image_url"].replace("{recipe}", "304x304");

return { artist: artist, title: title, cover: cover }*/