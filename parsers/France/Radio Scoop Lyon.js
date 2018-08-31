// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

const { exec } = require('child_process');

module.exports = function(exturl, callback) {

	exec('curl -X POST -d "data[]=event_getLastEvent(17317) ;" ' + exturl, (error, stdout, stderr) => {
		if (error) {
			console.error(`exec error: ${error}`);
			return callback(error, null, null);
		}
		var i1 = stdout.indexOf("setEvent('");
		stdout = stdout.slice(i1+10);
		var i2 = stdout.indexOf("') ; } catch (e) {}");
		stdout = stdout.slice(0, i2);
		var fields = stdout.split("', '");

		return callback(null, { artist: fields[1], title: fields[0], cover: exturl.slice(0, exturl.length-8) + "/img.php?id=" + fields[2] + "&w=330&h=330" }, false);
	});
}
