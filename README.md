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

## Contributing
You are welcome to submit a PR to add a new recipe for a radio or to fix a current recipe.
Two strategies have been used to write the recipes:
* parsing a JSON/XML API used by the radio website to dynamically update the page contents.
* brute parsing the live webpage contents when the API is not available.

When you have identified how to extract the data, you need to have a look at two files:
1) ```urls.js```

Example syntax:
```javascript
[
  {
    country: "France",
    radios: [
      ...
      { "name": "Fun Radio", "url": "http://www.funradio.fr/direct", "parser": "France_RTL2" },
      ...
```
The ```name``` field should match the corresponding entry in the [radio browser wiki](http://www.radio-browser.info/gui/#/).
The ```parser``` field is optional. If present, it tells the program to use the script for another radio, when the syntax for the other radio is the same.

2) ```parsers/*.js```
Please name new parser files with the following syntax: ```country_name.js```, with ```country``` and ```name``` matching the values in ```urls.js```. 

Sample:
```javascript
var get = require("./get.js");

module.exports = function(exturl, callback) {
  get(exturl, function(err, result, corsEnabled) {
    if (err) {
      return callback(err, null, null);
    }
    
    // ??? the magic happens here
    // var artist =
    // var title =
    // var cover =
    
    return callback(null, { artist: artist, title: title, cover: cover }, corsEnabled);
  });
}
```

## License
See LICENSE file
