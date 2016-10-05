/*eslint no-console: 0 */

var gulp = require('gulp');
var request = require('request');
var fs = require('fs');

gulp.task('jsdelivr', function(callback){
	console.log("Making request...");
	request({
		url: "https://api.jsdelivr.com/v1/jsdelivr/libraries?name=jsbarcode",
		json: true
	}, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			var readme = fs.readFileSync('README.md', "utf-8");
			var version = body[0].lastversion;

			readme = readme.replace(/https:\/\/cdn\.jsdelivr\.net\/jsbarcode\/[0-9]+\.[0-9]+\.[0-9]+\//g,
				"https://cdn.jsdelivr.net/jsbarcode/" + version + "/");

			fs.writeFileSync('README.md', readme, 'utf8');

			console.log("New version: " + version);
			callback();
		}
		else{
			console.error("Failed to make jsdelivr api request");
			callback();
		}
	});
});
