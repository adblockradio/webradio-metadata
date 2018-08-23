module.exports = [
	{ name: "bigFM Deutschland", url: "wss://ws.bigfm.de/", parser: require("./bigFM Deutschland") },
	{ name: "Fritz", url: "https://www.fritz.de/include/frz/zeitstrahl/nowonair.json", parser: require("./Fritz") },
	{ name: "Jam FM", url: "https://webradio.jam.fm/services/program-info/live/jam/", parser: require("./Jam FM") },
	{ name: "Klassik Radio", url: "https://proxy-prod.services.klassikradio.de/portal/json/live.json", parser: require("./Klassik Radio") },
	{ name: "Radio 7", url: "https://radio7-stream-service.loverad.io/v1/radio7?_=1530486845734", parser: require("./Radio 7") },
	{ name: "RTL Radio", url: "https://np.radioplayer.de/qp/v3/onair?rpIds=196&nameSize=200&artistNameSize=200&descriptionSize=200&callback=radioplayer.playing.receive&_=1530485565882", parser: require("./RTL Radio") },
]