// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2019 Alexandre Storelli

const W = require("ws");
// const { log } = require("abr-log")("meta-Belgium_Radio 1");

module.exports = async function(exturl) {
	try {
		return await new Promise(function(resolve, reject) {
			const ws = new W(exturl);
			ws.on('message', function incoming(msg) {
				if (msg === 'o') {
					return ws.send('["sub,11"]');
				}
				ws.close();
				try {
					msg = msg.slice(10, -2); // remove prefix 'a["msg,11,' and '"]'suffix
					msg = msg.replace(/\\"/g, '"'); // unescape double quotes
					msg = JSON.parse(msg);
					msg = msg.playlist.now.properties;
					return resolve({
						artist: msg.find(properties => properties.key === 'ARTISTNAME').value,
						title: msg.find(properties => properties.key === 'TITLE').value,
						cover: msg.find(properties => properties.key === 'PROGRAMIMAGE').value,
					});
				} catch(e) {
					return reject("could not parse data. e=" + e);
				}
			});
		});
	} catch (e) {
		return { error: e };
	}
}