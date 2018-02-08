// Copyright (c) 2017 Alexandre Storelli
// This file is licensed under the Affero General Public License version 3 or later.
// See the LICENSE file.

var get = require("./get.js");

module.exports = function(exturl, callback) {
	get(exturl, function(err, result, corsEnabled) { // add ?cc=YYYYMD ?
		if (err) {
			return callback(err, null, null);
		}

		try {
			parsedResult = JSON.parse(result.slice(8));	// remove "var cnt=" at the beginning
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
				return callback(null, { artist: item["speaker"], title: item["titre"], cover: item["image"] }, corsEnabled);
			}
		}

		return callback("program not found", null, null);
	});
}
