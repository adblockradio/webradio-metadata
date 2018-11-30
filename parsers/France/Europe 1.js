// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

"use strict";
const axios = require("axios");

module.exports = async function(exturl) {
	try {
		const now = new Date();
		const req = await axios.get(exturl + "?cc=" + now.getFullYear() + now.getMonth() + now.getDate());
		const parsedResult = JSON.parse(req.data.slice(8));

		var dayOfWeekFr = ['dimanche','lundi','mardi','mercredi','jeudi','vendredi','samedi'][now.getDay()];
		parsedResult.diffusions[dayOfWeekFr] = parsedResult.diffusions[dayOfWeekFr].filter(function (x, i, a) { // remove duplicate entries
			return a.indexOf(x) == i;
		});
		var items = parsedResult.diffusions[dayOfWeekFr];
		var nowStr = now.toLocaleTimeString('en-US', { hour12: false });

		for (let iit=0; iit<items.length; iit++) {
			var item = parsedResult["infos"][items[iit]];
			//log.debug(item.begin + " -- " + nowStr + " -- " + item.end);
			if (item.begin <= nowStr && nowStr < item.end) {
				//log.debug(iit + " ==> " + JSON.stringify(item));
				return { artist: item["speaker"], title: item["titre"], cover: "https:" + item["image"] };
			}
		}

		return { error: "Europe 1: program not found" };
	} catch (err) {
		return { error: err };
	}
}