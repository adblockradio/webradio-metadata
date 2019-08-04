// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

module.exports = [
	{ name: "Cadena 100", url: "http://bo.cope.webtv.flumotion.com/api/active?format=json&podId=76", parser: require("./Cadena 100") },
	{ name: "Cadena SER", url: "http://play.cadenaser.com/ajax/directos.default?emi=cadena_ser", parser: require("./Cadena SER") },
	{ name: "RAC 1", url: "https://api.audioteca.rac1.cat/piece/live", parser: require("./RAC 1") },
	{ name: "Rock FM", url: "https://www.rockfm.fm/app/directos/audio", parser: require("./Rock FM") },
]