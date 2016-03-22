/**
 * Created by neusoft on 2016/3/22.
 *
 */
var express = require('express');
var fs = require('fs');
var app = express();
app.get('/', function(req, res){
	res.send('blog');
});
app.get('/:year/:month/:day/:millsecond', function (req, res) {
	var requestParams = req.params;
	var fileName = requestParams.year + '-'
			+ requestParams.month + '-'
			+ requestParams.day + '-'
			+ requestParams.millsecond;
	fs.readFile('./docs/' + fileName + '.md', function (error, data) {
		if (error){
			throw new Error(error);
		}

		res.send(data);
	});
});

module.exports = app;