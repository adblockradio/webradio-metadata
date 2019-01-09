// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2019 Simon Lévesque

"use strict";
const axios = require("axios");

module.exports = async function(exturl) {
	try {
		const noCacheUrl = `${exturl}&request.preventCache=${Date.now()}`;
		const req = await axios.get(noCacheUrl);
		const xml = req.data;
		const title = xml.split('cue_title"><![CDATA[')[1].split(']]></property>')[0].trim();
		const artist = xml.split('track_artist_name"><![CDATA[')[1].split(']]></property>')[0].trim();
		return { artist, title };
	} catch (err) {
		return { error: err };
	}
}