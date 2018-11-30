// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

module.exports = [
	{ name: "Alouette", url: "https://www.alouette.fr/player/onair.php", parser: require("./Alouette") },
	{ name: "BFM Business", url: "https://bfmbusiness.bfmtv.com/current-emission/3", parser: require("./BFM Business") },
	{ name: "Chérie", url: "https://players.nrjaudio.fm/wr_api/live/fr?act=get_plist&id_wr=190&cp=utf8&fmt=json", parser: require("./NRJ") },
	{ name: "Djam Radio", url: "https://www.djamradio.com/actions/infos.php", parser: require("./Djam Radio") },
	{ name: "Europe 1", url: "http://cdn1-europe1.new2.ladmedia.fr/var/europe1/storage/diffusions_europe1.js", parser: require("./Europe 1") },
	{ name: "FIP", url: "https://www.fip.fr/livemeta/7", parser: require("./FIP") },
	{ name: "France Culture", url: "https://www.franceculture.fr/programmes?xmlHttpRequest=1", parser: require("./France Inter") },
	{ name: "France Info", url: "https://www.francetvinfo.fr/replay-radio/grille-des-emissions/", parser: require("./France Info") },
	{ name: "France Inter", url: "https://www.franceinter.fr/programmes?xmlHttpRequest=1&ignoreGridHour=1", parser: require("./France Inter") },
	{ name: "France Musique",	url: "https://www.francemusique.fr/programmes?xmlHttpRequest=1", parser: require("./France Inter") },
	{ name: "Fun Radio", url: "https://www.funradio.fr/direct", parser: require("./RTL2") },
	{ name: "Hit West", url: "http://www.hitwest.com/players/index/gettitrageplayer/idplayers/2174546520932614388", parser: require("./Hit West") },
	{ name: "Jazz Radio", url: "http://www.jazzradio.fr/winradio/live.xml", parser: require("./Jazz Radio") },
	{ name: "M Radio", url: "http://mradio.fr/winradio/prog.xml?_=", parser: require("./M Radio") },
	{ name: "Nostalgie", url: "https://players.nrjaudio.fm/wr_api/live/fr?act=get_cur&id_wr=197&cp=utf8&fmt=json", parser: require("./Nostalgie") },
	{ name: "NRJ", url: "https://players.nrjaudio.fm/wr_api/live/fr?act=get_cur&id_wr=158&cp=utf8&fmt=json", parser: require("./NRJ") },
	{ name: "OÜI FM", url: "https://www.ouifm.fr/onair.json", parser: require("./OÜI FM") },
	{ name: "Radio Classique", url: "https://d3gf3bsqck8svl.cloudfront.net/direct-metadata/current.json", parser: require("./Radio Classique") },
	{ name: "Radio FG", url: "https://www.radiofg.com/cache/titreplayer10", parser: require("./Radio FG") },
	{ name: "Radio Meuh", url: "http://player.radiomeuh.com/rtdata/tracks.json", parser: require("./Radio Meuh") },
	{ name: "Radio Nova",	url: "http://www.nova.fr/radio/19577/player", parser: require("./Radio Nova") },
	{ name: "Radio Scoop Lyon", url: "https://radioscoop.com/dyn/xhr.php", parser: require("./Radio Scoop Lyon") },
	{ name: "Rire et Chansons", url: "https://players.nrjaudio.fm/wr_api/live/fr?act=get_plist&id_wr=200&cp=utf8&fmt=json", parser: require("./Rire et Chansons") },
	{ name: "RFM", url: "http://directradio.rfm.fr/rfm/now/3", parser: require("./RFM") },
	{ name: "RMC", url: "https://bfmbusiness.bfmtv.com/current-emission/1", parser: require("./BFM Business") },
	{ name: "RTL", url: "https://www.rtl.fr/direct/live-player-config.json", parser: require("./RTL") },
	{ name: "RTL2", url: "https://www.rtl2.fr/direct", parser: require("./RTL2") },
	{ name: "Skyrock", url: "http://skyrock.fm/api/v3/player/onair", parser: require("./Skyrock") },
	{ name: "TSF Jazz", url: "http://www.tsfjazz.com/getSongInformations.php", parser: require("./TSF Jazz") },
	{ name: "Virgin Radio France", url: "https://www.virginradio.fr/radio/api/get_all_events.json/argv/id_radio/2/start/", parser: require("./Virgin Radio France") },
	{ name: "Voltage", url: "https://www.voltage.fr/players/index/gettitrageplayer/idplayers/2174546520932614870", parser: require("./Radio FG") },
]