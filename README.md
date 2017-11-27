Collection of urls and parsing scripts to fetch metadata about what is being broadcast on several webradios. Provides for each radio:
* an artist
* a title
* a cover image (if available)

## Installation
```sh
npm install
```

## Command-line usage
* To display the list of compatible radios.
```sh
nodejs getStreamMetadata.js list
```

* To check that the parsing scripts are working correctly. Empty result means success.
```sh
nodejs getStreamMetadata.js test
```

* To get the metadata from a specific radio. If the country or the name of a radio has multiple words, use quotes.
```sh
nodejs getStreamMetadata.js COUNTRY NAME
```
Example usages
```sh
$ nodejs getStreamMetadata.js "France" "France Info"
{"err":null,"data":{"artist":"Le 17 | 20 : Nicolas Teillard","title":"Droit à l'erreur - Guillaume Poitrinal"},"corsEnabled":false}
```
```sh
$ nodejs getStreamMetadata.js "France" "Radio Nova"
{"err":null,"data":{"artist":"AL GREEN","title":"LET'S STAY TOGETHER","cover":"https://nova.fr/sites/default/files/CQCT/2017-07/al-green-lets-stay-together-2893.jpeg"},"corsEnabled":true}
```

* To get metadata for all supported radios. Outputs a JSON.
```sh
nodejs getStreamMetadata.js all
```

## Usage as a module
```nodejs
require("./getStreamMetadata.js").getMeta(country, name, function(errors, parsedData, corsEnabled) { ... });
require("./getStreamMetadata.js").getAll(function(results) { ... });
```
## Demo webserver
A demo server and a React webapp are available in `test-server/`
![Demo webserver snapshot](test-server/res/web-interface.png)

## Usage in browser
This project uses Node.JS scripts and a JS web interface. Note the Node scripts cannot be put in the web interface, because some of the urls fetched do not have the CORS HTTP header ```Access-Control-Allow-Origin: *```. Ressource loading would be blocked by the browser. It might still work for the radios with the property ```corsEnabled: true``` in the results.

## Compatible webradios
* France - Alouette
* France - BFM Business
* France - Djam Radio
* France - Europe 1
* France - FIP
* France - France Info
* France - France Inter
* France - France Musique
* France - Fun Radio
* France - Jazz Radio
* France - NRJ
* France - OÜI FM
* France - Radio Classique
* France - Radio FG
* France - Radio Meuh
* France - Radio Nova
* France - Rire et Chansons
* France - RMC
* France - RTL
* France - RTL2
* France - Skyrock
* France - TSF Jazz
* France - Virgin Radio

## License
See LICENSE file
