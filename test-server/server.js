// Fetch and parse remote metadata
var getAll = require("../getStreamMetadata.js").getAll;
var metadata = [];
var update = function() {
	getAll(function(results) {
		metadata = results;
		console.log("metadata of " + metadata.length + " radios updated");
		setTimeout(update, 20000);
	});
}
console.log("please wait while metadata is being downloaded and parsed...");
console.log("metadata will be available as a JSON at http://localhost:3001/metadata")
update();

// Serve metadata to clients.
var http = require('http');
var express = require('express');
var helmet = require('helmet');
var app = express();
app.use(helmet());
app.get('/metadata', function(req, res) {
	res.set({ 'Access-Control-Allow-Origin': '*' });
	res.json(metadata);
});
var server = http.createServer(app);
server.listen(3001);
