// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

module.exports = [
	{ name: "Radio 24", url: "http://www.radio24.ilsole24ore.com/api/onair", parser: require("./Radio 24") },
	{ name: "Radio Capital", url: "https://www.capital.it/api/broadcast_airplay/?get=now", parser: require("./Radio Capital") },
	{ name: "Rai Radio 1", url: "https://www.raiplayradio.it/dl/palinsesti/oraInOndaRadio.json", parser: require("./Rai Radio 1") },
	{ name: "Rai Radio 2", url: "https://www.raiplayradio.it/dl/palinsesti/oraInOndaRadio.json", parser: require("./Rai Radio 2") },
	{ name: "Rai Radio 3", url: "https://www.raiplayradio.it/dl/palinsesti/oraInOndaRadio.json", parser: require("./Rai Radio 3") },
]