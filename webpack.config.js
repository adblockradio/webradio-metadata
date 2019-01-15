const path = require('path');
//const webpack = require('webpack');

module.exports = {
	entry: './index.js',
	output: {
		path: path.resolve(__dirname, 'build/'),
		filename: 'webradio-metadata.js'
	},
	/*plugins: [
		new webpack.ContextReplacementPlugin(/file-stream-rotator$/, ctx => {
			for (const x of ctx.dependencies) {
				x.critical = false;
			}
		})
	],*/
	target: 'node',
	mode: 'production'
};
