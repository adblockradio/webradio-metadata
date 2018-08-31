// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

module.exports = [
	{ name: "Bel-RTL", url: "https://www.radiocontact.be/json/epg24h_4.json", parser: require("./Bel-RTL") },
	{ name: "MNM", url: "https://services.vrt.be/playlist/onair?channel_code=55", parser: require("./MNM") },
	{ name: "Radio 1", url: "https://services.vrt.be/playlist/onair?channel_code=11&accept=application%2Fvnd.playlist.vrt.be.noa_1.0%2Bjson", parser: require("./MNM") },
	{ name: "RTBF La Première", url: "http://np.maradio.be/qp/v3/events?rpId=1103", parser: require("./RTBF La Première") },
	{ name: "Studio Brussel", url: "https://services.vrt.be/playlist/onair?channel_code=41&accept=application%2Fvnd.playlist.vrt.be.noa_1.0%2Bjson", parser: require("./Studio Brussel") },
	{ name: "Zen FM", url: "https://zenfm.be/wp-admin/admin-ajax.php", parser: require("./Zen FM") },
]