// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

"use strict";
const axios = require("axios");

module.exports = async function(exturl) {
	try {
		const req = await axios({
			method: 'POST',
			data: 'action=get_latest_played',
			url: exturl
		});

		const parsedResult = req.data;
		let p = parsedResult["data"];
		//log.debug(JSON.stringify(parsedResult, null, "\t"));
		//log.debug(p);

		const b1 = "</span><span>";
		const i1 = p.indexOf(b1);
		p = p.slice(i1 + b1.length);

		const time = p.slice(0, 5);
		const curTime = new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Brussels', hour: "2-digit", minute: "2-digit" });

		const t = [Number(time.slice(0, 2)), Number(time.slice(3, 5))];
		const curt = [Number(curTime.slice(0, 2)), Number(curTime.slice(3, 5))];

		if (60 * (curt[0] - t[0]) + curt[1] - t[1] <= 10) {
			p = p.slice(5);
			const i2 = p.indexOf(b1);
			p = p.slice(0, i2);
			const split = p.split("-");
			var artist = split[0].trim();
			var title = split[1].trim();
		} else {
			//log.debug("curt=" + curt + " t=" + t + "D=" + (60 * (curt[0] - t[0]) + curt[1] - t[1]));
			artist = "Zen FM";
			title = "Chill, lounge & trendy grooves";
		}

		return { artist: artist, title: title };
	} catch (err) {
		return { error: err };
	}
}
