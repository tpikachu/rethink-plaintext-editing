// const withCSS = require("@zeit/next-css");
// const pipe = require("lodash/fp/pipe");

// module.exports = pipe()({
// 	webpack: (config) => {
// 		// Load SVGs inline
// 		config.module.rules.push({
// 			test: /\.svg$/,
// 			use: { loader: "svg-inline-loader", options: {} }
// 		});
// 		return config;
// 	}
// });

// Removed the withCSS plugin due to can't load the external CSS
module.exports = {
	webpack: (config) => {
		// Load SVGs inline
		config.module.rules.push({
			test: /\.svg$/,
			use: { loader: "svg-inline-loader", options: {} }
		});
		return config;
	}
};
