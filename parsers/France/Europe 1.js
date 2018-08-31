// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

var get = require("../get.js");

module.exports = function(exturl, callback) {
	var now = new Date();
	get(exturl + "?cc=" + now.getFullYear() + now.getMonth() + now.getDate(), function(err, result, corsEnabled) {
		if (err) {
			return callback(err, null, null);
		}

		try {
			parsedResult = JSON.parse(result.slice(8)); // remove "var cnt=" at the beginning
		} catch(e) {
			return callback(e.message, null, null);
		}

		var now = new Date();
		var dayOfWeekFr = ['dimanche','lundi','mardi','mercredi','jeudi','vendredi','samedi'][now.getDay()];
		parsedResult.diffusions[dayOfWeekFr] = parsedResult.diffusions[dayOfWeekFr].filter(function (x, i, a) { // remove duplicate entries
			return a.indexOf(x) == i;
		});
		var items = parsedResult.diffusions[dayOfWeekFr];
		var nowStr = now.toLocaleTimeString('en-US', { hour12: false });

		for (iit=0; iit<items.length; iit++) {
			var item = parsedResult["infos"][items[iit]];
			//console.log(item.begin + " -- " + nowStr + " -- " + item.end);
			if (item.begin <= nowStr && nowStr < item.end) {
				//console.log(iit + " ==> " + JSON.stringify(item));
				return callback(null, { artist: item["speaker"], title: item["titre"], cover: "https:" + item["image"] }, corsEnabled);
			}
		}

		return callback("Europe 1: program not found", null, null);
	});
}
