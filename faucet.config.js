module.exports = {
	nunjucks: [{
		source: "./src/html/index.njk",
		target: "./dist/index.html"
	}, {
		source: "./src/html/other.njk",
		target: "./dist/other.html"
	}],
	static: [{
		source: "./src/js",
		target: "./dist/js",
	}],

	manifest: {
		target: "./dist/manifest.json",
		webRoot: "./dist"
	},
	watchDirs: ["./src"]
};
