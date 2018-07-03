// Copyright (c) 2018 Alexandre Storelli
// This file is licensed under the Affero General Public License version 3 or later.
// See the LICENSE file.

const { exec } = require('child_process');

module.exports = function(exturl, callback) {

	exec('curl -X POST -d "action=get_latest_played" ' + exturl, (error, stdout, stderr) => {
		if (error) {
			console.error(`exec error: ${error}`);
			return callback(error, null, null);
		}

		try {
			p = JSON.parse(stdout);
			p = p["data"];
			//console.log(JSON.stringify(parsedResult, null, "\t"));
		} catch(e) {
			console.log(stdout);
			return callback(e.message, null, null);
		}

		console.log(p);

		const b1 = "</span><span>";
		const i1 = p.indexOf(b1);
		p = p.slice(i1 + b1.length);

		const time = p.slice(0, 5);
		const curTime = new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Brussels', hour: "2-digit", minute: "2-digit" });

		const t = [Number(time.slice(0, 2)), Number(time.slice(3, 5))];
		const curt = [Number(curTime.slice(0, 2)), Number(curTime.slice(3, 5))];

		if (60 * (curt[0] - t[0]) + curt[1] - curt[0] <= 10) {
			p = p.slice(5);
			const i2 = p.indexOf(b1);
			p = p.slice(0, i2);
			const split = p.split("-");
			var artist = split[0].trim();
			var title = split[1].trim();
		} else {
			artist = "Zen FM";
			title = "Chill, lounge & trendy grooves";
		}

		return callback(null, { artist: artist, title: title }, false);

		/*var i1 = stdout.indexOf("setEvent('");
		stdout = stdout.slice(i1+10);
		var i2 = stdout.indexOf("') ; } catch (e) {}");
		stdout = stdout.slice(0, i2);
		var fields = stdout.split("', '");

		*/
	});
}
