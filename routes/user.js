/**
 * Created by neusoft on 2016/3/22.
 *
 */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var logger = require('morgan');
app.use(logger('dev'));

app.get('/', function (req, res) {
	req.db.user.find().toArray(function (error, items) {
		if (error) {
			throw new Error(error);
		}
		res.send(items);
	});
});

app.get('/:id', function (req, res) {
	req.db.user.findById(req.params.id, function (error, item) {
		if (error) {
			throw new Error(error);
		}
		res.send(item);
	});
});

app.post('/', function (req, res) {
	req.db.user.insert(req.body, function (error, result, next) {
		if (error) {
			throw new Error(error);
		}
		res.send(result);
	});
});

app.put('/:id', function (req, res) {
	var body = req.body;
	req.db.user.updateById({id: body.id},{name: body.name, email: body.email}, function(error, result){
		if (error) {
			throw new Error(error);
		}
		res.send(result);
	});
});

module.exports = app;