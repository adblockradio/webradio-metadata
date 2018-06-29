// Copyright (c) 2017 Alexandre Storelli
// This file is licensed under the Affero General Public License version 3 or later.
// See the LICENSE file.

module.exports = [
	{
		country: "France",
		radios: [
			{ "name": "Alouette", "url": "https://www.alouette.fr/player/onair.php" },
			{ "name": "BFM Business", "url": "https://bfmbusiness.bfmtv.com/current-emission/3" },
			{ "name": "Chérie", "url": "https://players.nrjaudio.fm/wr_api/live/fr?act=get_plist&id_wr=190&cp=utf8&fmt=json", "parser": "France_NRJ" },
			{ "name": "Djam Radio", "url": "http://www.djamradio.com/actions/infos.php" },
			{ "name": "Europe 1", "url": "http://cdn1-europe1.new2.ladmedia.fr/var/europe1/storage/diffusions_europe1.js" },
			{ "name": "FIP", "url": "https://www.fip.fr/livemeta/7" },
			{ "name": "France Culture", "url": "https://www.franceculture.fr/programmes?xmlHttpRequest=1", "parser": "France_France Inter" },
			{ "name": "France Info", "url": "https://www.francetvinfo.fr/replay-radio/grille-des-emissions/" },
			{ "name": "France Inter", "url": "https://www.franceinter.fr/programmes?xmlHttpRequest=1&ignoreGridHour=1" },
			{ "name": "France Musique",	"url": "https://www.francemusique.fr/programmes?xmlHttpRequest=1", "parser": "France_France Inter" },
			{ "name": "Fun Radio", "url": "https://www.funradio.fr/direct", "parser": "France_RTL2" },
			{ "name": "Jazz Radio", "url": "http://www.jazzradio.fr/winradio/live.xml" },
			{ "name": "M Radio", "url": "http://mradio.fr/winradio/prog.xml?_=" },
			{ "name": "NRJ", "url": "https://players.nrjaudio.fm/wr_api/live/fr?act=get_cur&id_wr=158&cp=utf8&fmt=json" },
			{ "name": "OÜI FM", "url": "https://www.ouifm.fr/onair.json" },
			{ "name": "Radio Classique", "url": "https://d3gf3bsqck8svl.cloudfront.net/direct-metadata/current.json" },
			{ "name": "Radio FG", "url": "https://www.radiofg.com/cache/titreplayer10" },
			{ "name": "Radio Meuh", "url": "http://player.radiomeuh.com/rtdata/tracks.json" },
			{ "name": "Radio Nova",	"url": "http://www.nova.fr/radio/19577/player" },
			{ "name": "Radio Scoop Lyon", "url": "https://radioscoop.com/dyn/xhr.php" },
			{ "name": "Rire et Chansons", "url": "http://www.rireetchansons.fr/webradios" },
			{ "name": "RFM", "url": "http://directradio.rfm.fr/rfm/now/3" },
			{ "name": "RMC", "url": "https://bfmbusiness.bfmtv.com/current-emission/1", "parser": "France_BFM Business" },
			{ "name": "RTL", "url": "http://www.rtl.fr/direct/live-player-config.json" },
			{ "name": "RTL2", "url": "https://www.rtl2.fr/direct" },
			{ "name": "Skyrock", "url": "http://skyrock.fm/api/v3/player/onair" },
			{ "name": "TSF Jazz", "url": "http://www.tsfjazz.com/getSongInformations.php" },
			{ "name": "Virgin Radio France", "url": "https://www.virginradio.fr/radio/api/get_all_events.json/argv/id_radio/2/start/" },
			{ "name": "Voltage", "url": "http://voltage.fr/players/index/gettitrageplayer/idplayers/2174546520932614870", "parser": "France_Radio FG" },
		]
	}
]
