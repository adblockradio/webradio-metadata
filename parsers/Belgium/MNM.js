// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

const { exec } = require("child_process");

module.exports = function(exturl, callback) {
	exec("curl '" + exturl + "' --compressed -H 'Accept: application/vnd.playlist.vrt.be.noa_1.0+json'", (error, stdout, stderr) => {
		if (error) {
			console.error(`exec error: ${error}`);
			return callback(error, null, null);
		}

		try {
			parsedResult = JSON.parse(stdout);
			parsedResult = parsedResult["onairs"].filter(e => e.onairType === "NOW");
		} catch(e) {
			console.log(stdout);
			return callback(e.message, null, null);
		}

		//console.log(parsedResult);

		if (parsedResult.length && parsedResult[0].properties.length) {
			const p = parsedResult[0].properties;
			const artist = p.filter(e => e.key === "ARTISTNAME")[0].value.trim();
			const title = p.filter(e => e.key === "TITLE")[0].value.trim();
			return callback(null, { artist: artist, title: title }, true);
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
		} else {
			exec('curl "https://services.vrt.be/epg/onair?channel_code=55" -H "Accept: application/vnd.epg.vrt.be.onairs_1.0+json"', (error, stdout2, stderr2) => {
				//console.log(stdout2);
				try {
					parsedResult = JSON.parse(stdout2);
					parsedResult = parsedResult["onairs"][0]["now"];
				} catch(e) {
					console.log(stdout);
					return callback(e.message, null, null);
				}

				//console.log(parsedResult);

				let artist, title;
				if (!parsedResult.presenters.length) {
					artist = parsedResult.title;
					title = parsedResult.shortDescription;
				} else {
					artist = parsedResult.presenters[0].name;
					title = parsedResult.title;
				}

				return callback(null, { artist: artist, title: title }, true);

			});
		}
	});
}
//https://services.vrt.be/music/songs?title=SAY%20SOMETHING%20&artist_name=JUSTIN%20TIMBERLAKE%20feat.%20CHRIS%20STAPLETON&accept=application%2Fvnd.music.vrt.be.songs_2.0%2Bjson