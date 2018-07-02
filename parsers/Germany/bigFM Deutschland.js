// Copyright (c) 2018 Alexandre Storelli
// This file is licensed under the Affero General Public License version 3 or later.
// See the LICENSE file.

const W = require("ws");

module.exports = function(exturl, callback) {
	const ws = new W(exturl);

	ws.on('open', function open() {
		ws.send('Hello server!');
  	});

	ws.on('message', function incoming(data) {
		try {
			var parsedData = JSON.parse(data);
		} catch(e) {
			console.log(data);
			log.error("could not parse data");
		}

		if (parsedData.day && parsedData.day.HMR) {
			const o = parsedData.day.HMR[0];
			ws.terminate();
			return callback(null, { artist: o.artist, title: o.title, cover: "https://storage.googleapis.com/bigfm-app.appspot.com/v2/covers/" + o.cover }, true);
		}

	});
}