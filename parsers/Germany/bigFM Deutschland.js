// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

const W = require("ws");
const { log } = require("abr-log")("meta-Germany_bigFM Deutschland");

module.exports = function(exturl, callback) {
	const ws = new W(exturl);

	ws.on('open', function open() {
		ws.send('Hello server!');
  	});

	ws.on('message', function incoming(data) {
		try {
			var parsedData = JSON.parse(data);
		} catch(e) {
			log.debug(data);
			log.error("could not parse data");
		}

		if (parsedData.day && parsedData.day.HMR) {
			const o = parsedData.day.HMR[0];
			ws.terminate();
			return callback(null, { artist: o.artist, title: o.title, cover: "https://storage.googleapis.com/bigfm-app.appspot.com/v2/covers/" + o.cover }, true);
		}

	});
}