var get = require("./get.js");

module.exports = function(exturl, callback) {
	get(exturl, function(err, result, corsEnabled) {

		if (err) {
			return callback(err, null, null);
		}

		var b8 = "<figure class=\"controlPanel-cover\">";
		var i8 = result.indexOf(b8);
		var r8 = result.slice(i8+b8.length);
		var b9 = "<img src=\"";
		var i9 = r8.indexOf(b9);
		var r9 = r8.slice(i9+b9.length);
		var b91 = " class=\"";
		var i91 = r9.indexOf(b91);
		var cover = r9.slice(0, i91);


		var b0 = "<p class=\"controlPanel-track\" title=\"";
		var i0 = r9.indexOf(b0);
		var r1 = r9.slice(i0+b0.length);
		var b1 = "\">";
		var i1 = r1.indexOf(b1);
		var meta1 = r1.slice(0, i1);

		var b3 = "<p class=\"controlPanel-artist\" title=\"";
		var i3 = r1.indexOf(b3);
		var r3 = r1.slice(i3+b3.length);
		var b4 = "\">";
		var i4 = r3.indexOf(b4);
		var meta2 = r3.slice(0, i4);

		return callback(null, { artist: meta2, title: meta1, cover: cover }, corsEnabled);
	});
}
