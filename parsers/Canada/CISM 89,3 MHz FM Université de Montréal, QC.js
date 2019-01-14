// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2019 Simon Lévesque

"use strict";
const axios = require("axios");

module.exports = async function(exturl) {
	try {
		const reqLive = await axios.get(exturl);
		const htmlLive = reqLive.data;
		const emissionPath = htmlLive.split('link-emission" href="')[1].split('"')[0].trim();
		const emissionLink = `http://cism893.ca/${emissionPath}`;
		const reqEmission = await axios.get(emissionLink);
		const htmlEmission = reqEmission.data;
		const title = htmlEmission.split('<h1 class="section-title">')[1].split('</h1>')[0].trim();
		const artist = htmlEmission.split('Animé par')[1].split('</h3>')[0].trim();
		const cover = htmlEmission.split('<div class="content columns"')[1].split('<img src="')[1].split('" ')[0].trim();
		return { artist, title, cover };
	} catch (err) {
		return { error: err };
	}
}