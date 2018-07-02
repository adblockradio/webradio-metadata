// Copyright (c) 2017 Alexandre Storelli
// This file is licensed under the Affero General Public License version 3 or later.
// See the LICENSE file.

module.exports = function(str) {
	return str.replace(/&#039;/g, "’").replace(/&amp;/g, '&').replace(/\n/g, ' ').replace(/\t/g, '').replace(/\r/g, '').trim();
}
