// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

"use strict";
const axios = require("axios");
const htmlToStr = require("../htmlToStr.js");

module.exports = async function(exturl) {
	try {
		const req = await axios.get(exturl);
		const result = req.data;
		var b0 = "img src=\"";
		var i0 = result.indexOf(b0);
		var r1 = result.slice(i0+b0.length); //.replace(/\n/g, '');

		var b1 = "\"";
		var i1 = r1.indexOf(b1);
		const cover = r1.slice(0, i1);

		var b11 = "<div class=\"myplay-program-title\">";
		var i11 = r1.indexOf(b11);
		var r2 = r1.slice(i11+b11.length);
		var b2 = "</div>";
		var i2 = r2.indexOf(b2);
		const title = htmlToStr(r2.slice(0, i2));

		var r3 = r2.slice(i2);
		var b3 = "<div class=\"myplay-program-time\">";
		var i3 = r3.indexOf(b3);
		var r4 = r3.slice(i3+b3.length);
		var b4 = "</div>";
		var i4 = r4.indexOf(b4);
		let artist = htmlToStr(r4.slice(0, i4));
		if (artist.slice(0, 4) === "amb ") artist = artist.slice(4);
		return { artist: artist, title: title, cover: cover };

	} catch (err) {
		return { error: err };
	}
}