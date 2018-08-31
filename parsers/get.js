// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

var http = require("http");
var https = require("https");
var url = require("url");

module.exports = function(exturl, callback) {
	var parsedUrl = url.parse(exturl);
	//console.log(parsedUrl);
	parsedUrl.withCredentials = false;
	var request = (parsedUrl.protocol == "https:" ? https : http).request(parsedUrl, function(res) {
		//console.log(res.getHeader("Access-Control-Allow-Origin"));
		var corsEnabled = res.headers["access-control-allow-origin"] === "*";
		var result = ""
		res.on('data', function(chunk) {
			//console.log("data");
			result += chunk;
		});
		res.on('end', function() {
			//console.log("response.................");
			//console.log(result);
			return callback(null, result, corsEnabled);
		});
	}).on("error", function(e) {
		return callback(e.message, null, null);
		//console.error(`Got error: ${e.message}`);
	});
	request.end();
}
