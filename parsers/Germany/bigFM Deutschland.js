// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

const W = require("ws");
const { log } = require("abr-log")("meta-Germany_bigFM Deutschland");

module.exports = async function(exturl) {
	try {
		return await new Promise(function(resolve, reject) {
			const ws = new W(exturl);

			ws.on('open', function open() {
				ws.send('Hello server!');
			});

			ws.on('message', function incoming(data) {
				try {
					var parsedData = JSON.parse(data);
				} catch(e) {
					log.debug(data);
					return reject("could not parse data");
				}

				if (parsedData.day && parsedData.day.HMR) {
					const o = parsedData.day.HMR[0];
					ws.terminate();
					return resolve({ artist: o.artist, title: o.title, cover: "https://storage.googleapis.com/bigfm-app.appspot.com/v2/covers/" + o.cover });
				} else {
					return reject("bigFM: no day and/or HMR");
				}
			});
		});
	} catch (e) {
		return { error: e };
	}
}