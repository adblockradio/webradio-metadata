Collection of urls and parsing scripts to fetch metadata about what is being broadcast on several webradios.

## Installation
```sh
npm install
```

## Command-line usage
To display the list of compatible radios.
```sh
	nodejs getStreamMetadata.js list
```

To check that the parsing scripts are working correctly. Empty result means success.
```sh
	nodejs getStreamMetadata.js test
```

To get the metadata from a specific radio. If the country or the name of a radio has multiple words, use quotes.
```sh
	nodejs getStreamMetadata.js COUNTRY NAME
```

To get metadata for all supported radios. Outputs a JSON.
```sh
	nodejs getStreamMetadata.js all
```

## Usage as a module
A demo server and a React webapp are available in `test-server/`

## License
See LICENSE file
