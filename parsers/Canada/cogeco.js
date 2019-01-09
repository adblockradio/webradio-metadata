// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2019 Simon Lévesque

"use strict";
const axios = require("axios");

module.exports = (lang) => {
    if (['fr', 'en'].indexOf(lang) === -1) {
        throw new Error('lang must be defined for cogeco meta parser');
    }
    const replacer = new RegExp(`^${lang === 'fr' ? 'avec' : 'with'}`);
    return async function(exturl) {
        try {
            const req = await axios.get(exturl);
            const html = req.data;
            const title = html.split('class="show-title"><a>')[1].split('</a>')[0].trim();
            const artist = html.split('class="show-hosts">')[1].trim().replace(replacer, '').split('</h4>')[0].trim();
            return { artist, title };
        } catch (err) {
            return { error: err };
        }
    }
}