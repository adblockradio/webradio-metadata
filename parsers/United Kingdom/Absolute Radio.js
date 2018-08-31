// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

var get = require("../get.js");

module.exports = function(exturl, callback) {
	get(exturl, function(err, result, corsEnabled) {

		if (err) {
			return callback(err, null, null);
		}

		//console.log(result);

		const b0 = "title=\"Listen to Absolute Radio\">";
		const i0 = result.indexOf(b0);
		let r = result.slice(i0);

		const b1 = "<img src=\"";
		const i1 = r.indexOf(b1);
		r = r.slice(i1 + b1.length); // presenter picture. skip it.
		const i2 = r.indexOf(b1);
		r = r.slice(i2 + b1.length);

		const b3 = "\" alt=\"";
		const i3 = r.indexOf(b3);
		const cover = r.slice(0, i3);

		r = r.slice(i3 + b3.length);

		const b4 = "\" class=\"";
		const i4 = r.indexOf(b4);
		const artist = r.slice(0, i4);

		const b5 = "is playing \"";
		const i5 = r.indexOf(b5);
		r = r.slice(i5 + b5.length);

		const b6 = "\" by";
		const i6 = r.indexOf(b6);
		const title = r.slice(0, i6);

		return callback(null, { artist: artist, title: title, cover: cover }, corsEnabled);
	});
}
