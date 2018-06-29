// Copyright (c) 2017 Alexandre Storelli
// This file is licensed under the Affero General Public License version 3 or later.
// See the LICENSE file.

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
