// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

"use strict";
const axios = require("axios");

module.exports = async function(exturl) {
	try {
		const req = await axios.get(exturl + "?after=" + (+new Date() - 60*60000));
		const result = req.data;
		var b0 = "<article class=\"timeline-post timeline-post--music\"";
		var i0 = result.indexOf(b0);
		var r1 = result.slice(i0+b0.length); //.replace(/\n/g, '');

		var b9 = "data-src=\"";
		var i9 = r1.indexOf(b9);
		var r9 = r1.slice(i9+b9.length);
		var b91 = "\"";
		var i91 = r9.indexOf(b91);
		var cover = r9.slice(0, i91);

		var b1 = "<strong class=\"timeline-media--music__title\">";
		var i1 = r9.indexOf(b1);
		var r2 = r9.slice(i1+b1.length);
		var b2 = "</strong>";
		var i2 = r2.indexOf(b2);
		var meta1 = r2.slice(0, i2); //.trim(); // music title

		var r3 = r2.slice(i2);
		var b3 = "<span class=\"timeline-media--music__artist\">";
		var i3 = r3.indexOf(b3);
		var r4 = r3.slice(i3+b3.length);
		var b4 = "</span>";
		var i4 = r4.indexOf(b4);
		var meta2 = r4.slice(0, i4); // music artist

		return { artist: meta2, title: meta1, cover: cover };
		// meta1 and meta2 may need some additional processing:
		// str.replace(/&#039;/g, "’").replace(/&amp;/g, '&').replace(/\n/g, ' ').replace(/\t/g, '').replace(/\r/g, '').trim()
	} catch (err) {
		return { error: err };
	}
}