// Copyright (c) 2018 Alexandre Storelli
// This file is licensed under the Affero General Public License version 3 or later.
// See the LICENSE file.

var get = require("../get.js");
const htmlToStr = require("../htmlToStr.js");

module.exports = function(exturl, callback) {
	get(exturl, function(err, result, corsEnabled) {

		if (err) {
			return callback(err, null, null);
		}

		try {
			parsedResult = JSON.parse(htmlToStr(result));
		} catch(e) {
			console.log(result);
			return callback(e.message, null, null);
		}

		if (parsedResult.artist && parsedResult.title) {
			const artist = parsedResult.artist;
			const title = parsedResult.title;
			const cover = parsedResult.img ? "https://www.fritz.de/content/dam/rbb/frz" + parsedResult.img.lnk + "/size=320x180.jpg" : undefined;
			return callback(null, { artist: artist, title: title, cover: cover }, corsEnabled);

		} else { // when no music metadata is present, put radioshow name instead
			get("https://www.fritz.de/livestream/index.htm/SSI=true/module=livestream%21reload/qualident=middleColumnList%21teaserboxgroup_0%21middleColumnList%21teaserbox.html", function(err, result2, corsEnabled) {

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

				return callback(null, { artist: artist, title: title, cover: cover }, corsEnabled);
			});
		}
	});
}
