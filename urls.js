module.exports = [
	{
		country: "France",
		radios: [
			{
				"name":"Radio FG",
				"url": "https://api.radioking.com/radio/accounts/getcurrenttitle?app=radiofg&apikey=7cfde934f1cee6fdac926f92baadbb9fb6852f14&idsite=5079&typetitrage=web&idserveur=8&username=&host=radiofg.impek.com&port=80&radiouid=&mount=fge&url=http://radiofg.impek.com/fge",
				"parser": "radioking"
			},
			{
				"name": "Radio Nova",
				"url": "https://www.nova.fr/radio/19577/player",
				"parser": "self"
			},
			{
				"name": "France Inter",
				"url": "https://www.franceinter.fr/programmes?xmlHttpRequest=1&ignoreGridHour=1",
				"parser": "radiofrance"
			},
			{
				"name": "Europe 1",
				"url": "http://cdn1-europe1.new2.ladmedia.fr/var/europe1/storage/diffusions_europe1.js",
				"parser": "self"
			}
		]
	}
]
