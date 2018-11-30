// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

"use strict";
const axios = require("axios");

module.exports = async function(exturl) {
	try {
		const req = await axios.get(exturl);
		const parsedResult = req.data;
		const now = new Date().toISOString();
		const data = parsedResult.items.filter(i => i['published_time']['start'] <= now && now < i['published_time']['end']);
		if (!data.length) return callback(null, { artist: 'BBC', title: 'Radio 4', cover: null }, corsEnabled);
		return { artist: data[0]['brand']['title'], title: data[0]['episode']['title'] };
		//cover: 'https://ichef.bbci.co.uk/images/ic/640x640/' + data[0]['id'] + '.jpg' // not working

	} catch (err) {
		return { error: err };
	}
}
