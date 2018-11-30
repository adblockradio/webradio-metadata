// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

"use strict";
const axios = require("axios");

module.exports = async function(exturl) {
	try {
		const req = await axios({
			method: 'GET',
			url: exturl,
			headers: {
				'Accept': 'application/vnd.playlist.vrt.be.noa_1.0+json'
			}
		});

		const parsedResult = req.data["onairs"].filter(e => e.onairType === "NOW");

		if (parsedResult.length && parsedResult[0].properties.length) {
			const p = parsedResult[0].properties;
			const artist = p.filter(e => e.key === "ARTISTNAME")[0].value.trim();
			const title = p.filter(e => e.key === "TITLE")[0].value.trim();
			return { artist: artist, title: title };
			/*
			{
				"channelCode": "55",
				"startDate": "2018-07-02T14:50:08.979Z",
				"endDate": "2018-07-02T14:53:41.979Z",
				"type": "SONG",
				"onairType": "NOW",
				"properties" : [
					{
						"key" : "ARTISTNAME",
						"value"  : "CAMILA CABELLO feat. YOUNG THUG"
			},		{
						"key" : "TITLE",
						"value"  : "HAVANA"
			},		{
						"key" : "COMPOSER",
						"value"  : "C.Cabello"
			}
			*/
		}

		const req2 = await axios({
			method: 'GET',
			url: 'https://services.vrt.be/epg/onair?channel_code=55',
			headers: {
				'Accept': 'application/vnd.epg.vrt.be.onairs_1.0+json'
			}
		});

		const parsedResult2 = req2.data["onairs"][0]["now"];

		//log.debug(parsedResult);

		let artist, title;
		if (!parsedResult2.presenters.length) {
			artist = parsedResult2.title;
			title = parsedResult2.shortDescription;
		} else {
			artist = parsedResult2.presenters[0].name;
			title = parsedResult2.title;
		}

		return { artist: artist, title: title };

	} catch (err) {
		return { error: err };
	}
}

//https://services.vrt.be/music/songs?title=SAY%20SOMETHING%20&artist_name=JUSTIN%20TIMBERLAKE%20feat.%20CHRIS%20STAPLETON&accept=application%2Fvnd.music.vrt.be.songs_2.0%2Bjson