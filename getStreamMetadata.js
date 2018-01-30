// Copyright (c) 2017 Alexandre Storelli
// This file is licensed under the Affero General Public License version 3 or later.
// See the LICENSE file.

let urls = require("./urls.js");
let log = require("./log.js")("meta");

var LOG_ERRORS = false;

exports.getMeta = getMeta = function(country, name, callback) {
	for (let i=0; i<urls.length; i++) {				// loop on countries
		if (urls[i].country === country) {
			for (let j=0; j<urls[i].radios.length; j++) {	// loop on radios
				if (urls[i].radios[j].name === name) {
					if (!urls[i].radios[j].parser) urls[i].radios[j].parser = country + "_" + name;
					return require("./parsers/" + urls[i].radios[j].parser + ".js")(urls[i].radios[j].url, function(error, parsedData, corsEnabled) {
						if (error) {
							return callback(error, null, corsEnabled);
						} else {
							return callback(null, parsedData, corsEnabled);
						}
					});
				}
			}
		}
	}
	return callback("radio " + country + "_" + name + " not found", null, null);
}

exports.getAvailable = getAvailable = function() {
	var list = [];
	for (let i=0; i<urls.length; i++) {
		for (let j=0; j<urls[i].radios.length; j++) {	// loop on radios
			list.push({ country: urls[i].country, name: urls[i].radios[j].name });
		}
	}
	return list;
}

exports.getAll = getAll = function(callback) {
	var jobs = getAvailable();
	var f = function(ijob) {
		if (ijob >= jobs.length) return callback(jobs);
		getMeta(jobs[ijob].country, jobs[ijob].name, function(err, data, corsEnabled) {
			Object.assign(jobs[ijob], {
				err: err,
				data: data,
				corsEnabled: corsEnabled
			});
			if (LOG_ERRORS && err) log.warn(jobs[ijob].country + "_" + jobs[ijob].name + " : error=" + err);
			f(ijob+1, callback);
		});
	}
	f(0);
}

//module.exports = getStreamMetadata;

if (process.argv.length >= 3 && process.argv[1].slice(-20) == "getStreamMetadata.js") { // standalone usage
	if (process.argv[2] == "list") {				// loop on countries
		log.info("list of available parsing recipes:");
		for (let i=0; i<urls.length; i++) {
			for (let j=0; j<urls[i].radios.length; j++) {	// loop on radios
				log.info(urls[i].country + " - " + urls[i].radios[j].name);
			}
		}
		return
	} else if (process.argv[2] == "all" || process.argv[2] == "test") {
		LOG_ERRORS = process.argv[2] == "test";
		getAll(function(jobs) {
			if (process.argv[2] == "all") log.info(JSON.stringify(jobs));
		});

	} else if (process.argv.length >= 4) {
		getMeta(process.argv[2], process.argv[3], function(err, data, corsEnabled) {
			log.info(JSON.stringify({ err: err, data: data, corsEnabled: corsEnabled }));
		});
	}

}
