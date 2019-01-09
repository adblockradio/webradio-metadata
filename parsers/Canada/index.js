// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2019 Simon Lévesque

module.exports = [
	{ name: "CHMP-FM 98,5 MHz FM, Montréal", url: "https://www.985fm.ca/emissions", parser: require("./cogeco")('fr') },
	{ name: 'CFGL "Rythme Montreal 105.7" Laval, QC', url: "https://montreal.rythmefm.com/emissions", parser: require('./cogeco')('fr') },
	{ name: 'CKOF "104.7 Outaouais" Gatineau, QC', url: "https://www.fm1047.ca/emissions", parser: require('./cogeco')('fr') },
	{ name: 'CIME 103.9 St-Jerome, QC', url: "https://www.cime.fm/emissions", parser: require('./cogeco')('fr') },
	{ name: 'CKOY "107.7 FM Estrie" Sherbrooke, QC', url: "https://www.fm1077.ca/emissions", parser: require('./cogeco')('fr') },
	{ name: 'CFGE "Rythme Estrie 93.7 & 98.1" Sherbrooke, QC', url: "https://estrie.rythmefm.com/emissions", parser: require('./cogeco')('fr') },
	{ name: 'CKOB 106.9 Trois-Rivieres, QC', url: "https://www.fm1069.ca/emissions", parser: require('./cogeco')('fr') },
	{ name: 'CJEB 100.1 "Rythme 100.1 Mauricie" Trois Rivieres, QC', url: "https://mauricie.rythmefm.com/emissions", parser: require('./cogeco')('fr') },
	{ name: 'CFOM "M FM 102.9" Quebec City, QC', url: "https://www.m1029.com/emissions", parser: require('./cogeco')('fr') },
	{ name: 'CJMF 93.3 "FM93" Quebec City, QC', url: "https://www.fm93.com/emissions", parser: require('./cogeco')('fr') },
	{ name: 'CKOI 96.9 Montreal, QC', url: "https://www.ckoi.com/emissions", parser: require('./cogeco')('fr') },
	{ name: 'CKBE "The Beat 92.5" Montreal, QC', url: "https://www.thebeat925.ca/emissions", parser: require('./cogeco')('en') },
	{ name: "CISM 89,3 MHz FM Université de Montréal, QC", url: "http://cism893.ca/getLiveInfo/", parser: require("./CISM 89,3 MHz FM Université de Montréal, QC") },
	{ name: "CHOM 97.7 Montreal, QC", url: "http://np.tritondigital.com/public/nowplaying?mountName=CHOMFM&numberToFetch=1&eventType=track", parser: require("./CHOM 97.7 Montreal, QC") }
]
