// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Copyright (c) 2018 Alexandre Storelli

import React, { Component } from 'react';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			metadatas: []
		}
	}

	load(path, callback) {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState === 4 && xhttp.status === 200) {
				callback(xhttp.responseText); //, xhttp.getResponseHeader("Content-Type"));
			}
		};
		xhttp.onerror = function (e) {
			console.log("getHeaders: request failed: " + e);
		};
		xhttp.open("GET", path, true);
		xhttp.send();
	}

	componentDidMount() {
		let self = this;
		setInterval(function() {
			self.load("http://localhost:3001/metadata", function(res) {
				try {
					var metadatas = JSON.parse(res);
					console.log(metadatas);
					self.setState({ metadatas: metadatas });
				} catch(e) {
					console.log("problem parsing JSON from server: " + e.message);
				}
			}, 5000);
		});
	}

	render() {
		let metadatas = this.state.metadatas;
		return (
			<div>
				<div class="MetaList">
					{metadatas.length > 0 ?
						metadatas.map(function(metadata, i) {
							return (
								<div className="MetaItem" key={"metadata" + i}>
									<h1 className="App-title">{metadata.country + " - " + metadata.name}</h1>
									{metadata.err
										?<p className="error">
											{"" + metadata.err}
										</p>
										:<div className="App-intro">
											<p>Artist: {metadata.data.artist}</p>
											<p>Title: {metadata.data.title}</p>
											{metadata.data.cover &&
												<p><img src={metadata.data.cover} className="App-logo" alt="logo" /></p>
											}
											<p>CORS headers for usage in browser : {"" + metadata.corsEnabled}</p>
										</div>

									}
								</div>
							)
						})
					:
					<div className="MetaItem">
						<p>Empty metadata, are you sure the backend server is running?</p>
						<code>nodejs server.js</code>
						<p>Then refresh this page</p>
					</div>
					}
				</div>
				<div class="Footer">
					Software released under licence MPL-2.0. Parsed contents may be protected by copyright
				</div>
			</div>
		);
	}
}

export default App;
