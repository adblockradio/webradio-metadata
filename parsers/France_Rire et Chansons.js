// Copyright (c) 2017 Alexandre Storelli
// This file is licensed under the Affero General Public License version 3 or later.
// See the LICENSE file.

var get = require("./get.js");

module.exports = function(exturl, callback) {
	get(exturl, function(err, result, corsEnabled) {

		if (err) {
			return callback(err, null, null);
		}

		var b0 = "<a href=\"/webradios/rire-chansons\"";
		var i0 = result.indexOf(b0);
		var r1 = result.slice(i0+b0.length);
		var b1 = "<span class=\"song-artist\">";
		var i1 = r1.indexOf(b1);
		var r2 = r1.slice(i1+b1.length);
		var b2 = "</span>";
		var i2 = r2.indexOf(b2);
		var meta1 = r2.slice(0, i2);

		var b3 = "<span class=\"song-title\">";
		var i3 = r1.indexOf(b3);
		var r3 = r1.slice(i3+b3.length);
		var b4 = "</span>";
		var i4 = r3.indexOf(b4);
		var meta2 = r3.slice(0, i4);

		return callback(null, { artist:meta1, title:meta2 }, corsEnabled);
	});
}
