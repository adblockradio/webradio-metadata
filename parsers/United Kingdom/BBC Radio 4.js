// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

var get = require("../get.js");
const { log } = require("abr-log")("meta-United Kingdom_BBC Radio 4");

module.exports = function(exturl, callback) {
	get(exturl, function(err, result, corsEnabled) {
		if (err) {
			return callback(err, null, null);
		}

		const now = new Date().toISOString();
		try {
			parsedResult = JSON.parse(result);
			const data = parsedResult.items.filter(i => i['published_time']['start'] <= now && now < i['published_time']['end']);
			if (!data.length) return callback(null, { artist: 'BBC', title: 'Radio 4', cover: null }, corsEnabled);
			return callback(null, { artist: data[0]['brand']['title'], title: data[0]['episode']['title'], cover: null }, corsEnabled);
			//cover: 'https://ichef.bbci.co.uk/images/ic/640x640/' + data[0]['id'] + '.jpg' // not working
		} catch(e) {
			log.debug(result);
			return callback(e.message, null, null);
		}

		/*parsedResult = parsedResult["modules"];
		parsedResult = parsedResult.filter(e => e.id === "listen_live")[0]["items"];
		parsedResult = parsedResult.filter(e => e.id === "bbc_radio_fourfm")[0];
		//log.debug(JSON.stringify(parsedResult, null, "\t"));

		const artist = parsedResult["titles"]["primary"];
		const title = parsedResult["titles"]["secondary"];
		const cover = parsedResult["image_url"].replace("{recipe}", "304x304");

		return callback(null, { artist: artist, title: title, cover: cover }, corsEnabled);*/
	});
}
