/**
 * Created on 2016/3/22.
 *
 */
var express = require('express');
var db = require('../common/db/db.config').db;
db.bind('user');
var app = express();

//取得user集合中的所有记录
app.get('/', function (req, res) {
	db.user.find().toArray(function (error, items) {
		if (error) {
			throw new Error(error);
		}
		res.send(items);
	});
});

app.get('/counter', function(req, res){
	db.user.count(function(error, count){
		if (error) {
			throw new Error(error);
		}
		res.send({count: count});
	});
});

//根据email和name取得集合中的doc
app.get('/email/:email/name/:name', function (req, res) {
	var email = req.params.email;
	var name = req.params.name;
	var options = {};
	if (email) {
		options.email = email;
	}
	if (name) {
		options.name = name;
	}
	db.user.find(options).toArray(function (error, item) {
		if (error) {
			throw new Error(error);
		}
		res.send(item);
	});
});

//新建一个doc
app.post('/', function (req, res) {
	db.user.insert(req.body, function (error, result) {
		if (error) {
			throw new Error(error);
		}
		res.send(result);
	});
});

//根据email，修改用户的name
app.put('/', function (req, res) {
	var email = req.body.email;
	var options = {};
	if (email) {
		options.email = email;
	}

	var body = req.body;
	db.user.update(options, {$set: {name: body.name}}, function (error, result) {
		if (error) {
			throw new Error(error);
		}
		res.send(result);
	});
});

//根据email删除一个doc
app.delete('/email/:email', function(req, res, next){
	var email = req.params.email;
	db.user.remove({email: {$eq: email}}, function(error, result){
		if (error) {
			throw new Error(error);
		}
		res.send(result);
	});
});

module.exports = app;