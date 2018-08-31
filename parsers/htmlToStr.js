// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

module.exports = function(str) {
	return str.replace(/&#039;/g, "’").replace(/&amp;/g, '&').replace(/\n/g, ' ').replace(/\t/g, '').replace(/\r/g, '').trim();
}
