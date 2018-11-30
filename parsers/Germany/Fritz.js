// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

"use strict";
const axios = require("axios");
const htmlToStr = require("../htmlToStr.js");
//const { log } = require("abr-log")("Meta-Fritz");

module.exports = async function(exturl) {
	try {
		const req = await axios.get(exturl);
		const parsedResult = req.data;
		if (parsedResult.artist && parsedResult.title) {
			const artist = parsedResult.artist;
			const title = parsedResult.title;
			const cover = parsedResult.img ? "https://www.fritz.de/content/dam/rbb/frz" + parsedResult.img.lnk + "/size=320x180.jpg" : undefined;
			return { artist: artist, title: title, cover: cover };

		} else { // when no music metadata is present, put radioshow name instead
			let result2 = await axios.get("https://www.fritz.de/livestream/index.htm/SSI=true/module=livestream%21reload/qualident=middleColumnList%21teaserboxgroup_0%21middleColumnList%21teaserbox.html");
			result2 = result2.data;
			//log.debug(result2);

			result2 = htmlToStr(result2);

			const b1 = "<span class=\"manualteasertitle\">";
			const b2 = "</span>";
			const i1 = result2.indexOf(b1) + b1.length;
			const r1 = result2.slice(i1);
			const i2 = r1.indexOf(b2);

			const title = r1.slice(0, i2);
			const r2 = r1.slice(i2);

			const b3 = "<img src=\"";
			const i3 = r2.indexOf(b3) + b3.length;
			const r3 = r2.slice(i3);
			const b4 = "\" alt=\"";
			const i4 = r3.indexOf(b4);
			const cover = "https://www.fritz.de" + r3.slice(0, i4);

			const r4 = r3.slice(i4+b4.length);
			const b5 = "\"";
			const i5 = r4.indexOf(b5);
			let artist = r4.slice(0, i5);

			const b6 = " ("; // remove photo credits
			const i6 = artist.indexOf(b6);
			if (i6 > 0) {
				artist = artist.slice(0, i6);
			}

			return { artist: artist, title: title, cover: cover };
		}
	} catch (err) {
		return { error: err };
	}
}