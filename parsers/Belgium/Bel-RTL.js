// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

"use strict";
var get = require("../get.js");
const htmlToStr = require("../htmlToStr.js");
const { log } = require("abr-log")("meta-Belgium_Bel-RTL");

module.exports = function(exturl, callback) {
	get(exturl, function(err, result, corsEnabled) {

		if (err) {
			return callback(err, null, null);
		}

		const time = new Date().toLocaleTimeString("fr-be", { timeZone: "Europe/Brussels" })
		const date = new Date().toLocaleDateString("fr-be", { timeZone: "Europe/Brussels" }).replace(/-/g, "/");
		const reversedDate = date.split("/").reverse().join("/");
		/* sample result:
		{
			"epg": [
				{
					"id": "1585",
					"title": "Mon 5 à 7 avec Fabrice",
					"header": "Du lundi au vendredi de 5h à 7h",
					"description": "Dès 5h00, Bel RTL vous réveille avec l’énergie et la bonne humeur de Fabrice Collignon.",
					"img": "/GED/00150000/155300/155340.jpg",
					"link":"value",
					"date":"2018/10/11",
					"timing":  "05:00:00",
					"duration":  "120",
					"timingend":  "11/10/2018 07:00:00",
					"animators": [
						{
							"Name": "Fabrice Collignon",
							"Img": ""
						}
					]
				},
				...
			]
		}
		*/
		//log.debug(now);
		try {
			var parsedResult = JSON.parse(htmlToStr(result));
			parsedResult = parsedResult["epg"];
			parsedResult = parsedResult.filter(e => date >= e.date && time >= e.timing && (reversedDate  + " " + time) < e.timingend)[0];
		} catch(e) {
			log.debug(result);
			return callback(e.message, null, null);
		}

		if (parsedResult) {
			//log.debug(result2);
			const artist = (parsedResult["animators"] && parsedResult["animators"][0] && parsedResult["animators"][0]["Name"]) || "Bel RTL";
			const title = parsedResult["title"] || "Bel RTL";
			const cover = "https://www.rtl.be/belrtl" + parsedResult["img"];
			return callback(null, { artist: artist, title: title, cover: cover }, corsEnabled);
		}

		log.debug("first result is empty");
		get("https://www.radiocontact.be/json/epg24h_4.json", function(err, result2, corsEnabled) {
			try {
				parsedResult = JSON.parse(htmlToStr(result2));
				const now = new Date();
				parsedResult = parsedResult.items;
				parsedResult = parsedResult.filter(e => (now >= new Date(e.datetime)) && (now < new Date(+new Date(e.datetime) + Number(e.duration) * 60000)))[0];
			} catch(e) {
				log.debug(result);
				return callback(e.message, null, null);
			}

			//log.debug(parsedResult);
			const artist = "Bel RTL";
			const title = (parsedResult && parsedResult.title) || "Bel RTL";
			const cover = "https:" + parsedResult.image;
			return callback(null, { artist: artist, title: title, cover: cover }, corsEnabled);
		});
	});

	/*
	Metadata with songs names is a bit complex and needs cookie headers to work.
	let exturl = "https://belrtl.ice.infomaniak.ch/metadata?type=json&cb=58761570037";
	exec("curl '" + exturl + "' --compressed -H 'Cookie: AISSessionId=5a4f31406ed1d34c_15394354_TI8hJRPc_MTg1Ljc0LjcwLjk!_000000aAkw6'", (error, stdout, stderr) => {
		if (error) {
			console.error(`exec error: ${error}`);
			return callback(error, null, null);
		}

		try {
			parsedResult = JSON.parse(stdout);
			parsedResult = parsedResult["metadata-list"][0]["metadata"];
		} catch(e) {
			log.debug(result);
			return callback(e.message, null, null);
		}

		log.debug(parsedResult);
	});
	*/
}