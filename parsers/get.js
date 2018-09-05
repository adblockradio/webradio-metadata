// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

var http = require("http");
var https = require("https");
var url = require("url");
const { log } = require("abr-log")("meta-get");


module.exports = function(exturl, callback) {
	var parsedUrl = url.parse(exturl);
	//log.debug(parsedUrl);
	parsedUrl.withCredentials = false;
	var request = (parsedUrl.protocol == "https:" ? https : http).request(parsedUrl, function(res) {
		//log.debug(res.getHeader("Access-Control-Allow-Origin"));
		var corsEnabled = res.headers["access-control-allow-origin"] === "*";
		var result = ""
		res.on('data', function(chunk) {
			//log.debug("data");
			result += chunk;
		});
		res.on('end', function() {
			//log.debug("response.................");
			//log.debug(result);
			return callback(null, result, corsEnabled);
		});
	}).on("error", function(e) {
		return callback(e.message, null, null);
		//console.error(`Got error: ${e.message}`);
	});
	request.end();
}
