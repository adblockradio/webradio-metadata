let urls = require("./urls.js");

var getStreamMetadata = function(country, name, callback) {
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
	return callback("radio not found", null);
}

module.exports = getStreamMetadata;

if (process.argv.length >= 4 && process.argv[1].slice(-20) == "getStreamMetadata.js") { // standalone usage
	getStreamMetadata(process.argv[2], process.argv[3], function(err, data, corsEnabled) {
		console.log(JSON.stringify({ err: err, data: data, corsEnabled: corsEnabled }));
	});
}
