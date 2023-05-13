module.exports = {
	entry: __dirname + '/client/src/index.jsx',
	mode: 'development', 
	module: {
		rules: [ 
			{
				test: [/\.(js|jsx)$/],
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-react', '@babel/preset-env'],
					},
				},
			},
			{
        		test: /\.css$/i,
        		use: ["style-loader", "css-loader"],
      		},
			{
				test: [/\.(js|jsx)$/],
				enforce: 'pre',
				use: ['source-map-loader'],
			},
		],
	},
	output: {
		filename: 'bundle.js',
		path: __dirname + '/client/dist',
	},
};