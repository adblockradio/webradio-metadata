var get = require("./get.js");

module.exports = function(exturl, callback) {
	get(exturl, function(err, result) {
		try {
			parsedResult = JSON.parse(result.slice(8));	// remove "var cnt=" at the beginning
		} catch(e) {
			return callback(e.message, null);
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
				return callback(null, item["speaker"] + " - " + item["titre"]);
			}
		}

		return callback("program not found", null);
	});
}
