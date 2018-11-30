// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

"use strict";

const axios = require("axios");
//const qs = require("qs");
//const { log } = require("abr-log")("meta-Djam Radio");

module.exports = async function(exturl) {
	try {
		const req = await axios({
			method: 'POST',
			url: exturl,
			data : "data[]=event_getLastEvent(17317) ;",
		});
		let result = req.data;
		var i1 = result.indexOf("setEvent('");
		result = result.slice(i1+10);
		var i2 = result.indexOf("') ; } catch (e) {}");
		result = result.slice(0, i2);
		var fields = result.split("', '");

		return { artist: fields[1], title: fields[0], cover: exturl.slice(0, exturl.length-8) + "/img.php?id=" + fields[2] + "&w=330&h=330" };
	} catch (err) {
		return { error: err };
	}
}