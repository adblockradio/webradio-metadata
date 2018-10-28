// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

module.exports = [
	{ name: "Absolute Radio", url: "https://absoluteradio.co.uk/", parser: require("./Absolute Radio") },
	{ name: "BBC Radio 1", url: "https://rms.api.bbc.co.uk/v2/services/bbc_radio_one/tracks/latest/playable", parser: require("./BBC Radio 1")("Radio 1") },
	{ name: "BBC Radio 2", url: "https://rms.api.bbc.co.uk/v2/services/bbc_radio_two/tracks/latest/playable", parser: require("./BBC Radio 1")("Radio 2") },
	{ name: "BBC Radio 3", url: "https://rms.api.bbc.co.uk/v2/services/bbc_radio_three/tracks/latest/playable", parser: require("./BBC Radio 1")("Radio 3") },
	{ name: "BBC Radio 4", url: "https://ess.api.bbci.co.uk/schedules?serviceId=bbc_radio_fourfm", parser: require("./BBC Radio 4") },
	{ name: "Kiss UK", url: "https://planetradio.co.uk/kiss/player/", parser: require("./Kiss UK") },
]