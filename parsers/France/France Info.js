// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

const get = require("../get.js");
const { log } = require("abr-log")("meta-France_France Info");

module.exports = function(exturl, callback) {
	get(exturl, function(err, result, corsEnabled) {

		if (err) {
			return callback(err, null, null);
		}

		var b0 = "program__grid__line expanded";
		var i0 = result.indexOf(b0);
		var r1 = result.slice(i0+b0.length);
		var b1 = "program__grid__line ";
		var i1 = r1.indexOf(b1);
		var r2 = r1.slice(0, i1);
		//log.debug(r2);

		var b2 = "<span class=\"program__grid__line__right__title\">";
		var b3 = "</span>";
		var i2 = r1.indexOf(b2);
		var i3 = r1.indexOf(b3);
		var meta1 = r2.slice(i2+b2.length, i3).trim(); // title of the large program window

		if (meta1.length == 0) {
			return callback("empty line title", null, null);
		}

		var bs = "class=\"program__grid__subline ";
		var r2s = r1.split(bs);
		var currentBlock = -1;
		for (var i=1; i<r2s.length; i++) {
			if (r2s[i].indexOf("is-available") < 0) break;
			currentBlock = i;
		}

		if (currentBlock < 0) {
			log.warn("France_France Info: warning, could not get subline title");
			return callback(null, meta1, corsEnabled);
		}

		//log.debug(r2s[currentBlock]);
		var b4 = "class=\"program__grid__line__right__title\">";
		var b5 = "</a>";
		var i4 = r2s[currentBlock].indexOf(b4);
		var r3 = r2s[currentBlock].slice(i4+b4.length);
		var i5 = r3.indexOf(b5);
		var meta2 = r3.slice(0, i5).trim(); // title of the precise current program

		return callback(null, { artist: meta1, title: meta2 }, corsEnabled);
	});
}
