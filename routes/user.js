/**
 * Created by neusoft on 2016/3/22.
 *
 */
var express = require('express');
var db = require('../common/db/db.config').db;
db.bind('user');
var app = express();

//设置跨域访问  
app.all('*', function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    res.header("X-Powered-By",' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	if (req.method !== 'OPTIONS'){
	}
    next();  
});



app.get('/counter', function(req, res){
	db.user.count(function(error, count){
		if (error) {
			throw new Error(error);
		}
		res.send({count: count});
	});
});

app.options('/', function(req, res){
	res.send();
});

//取得user集合中的所有记录
app.get('/', function (req, res) {
	db.user.find().toArray(function (error, items) {
		if (error) {
			throw new Error(error);
		}
		res.send(items);
	});
});

//根据email取得集合中的doc
app.get('/:email', function (req, res) {
	var email = req.params.email;
	var options = {};
	if (email) {
		options.email = email;
	}

	db.user.find(options).toArray(function(error, user){
		if (error){
			throw new Error(error);
		}

		res.send({data: user});
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
	if (!email){
		throw new Error('email is not exist');
	}

	options.email = email;
	var body = req.body;
	db.user.update(options, {$set: {name: body.name}}, function (error, result) {
		if (error) {
			throw new Error(error);
		}
		res.send(result);
	});
});

//根据email删除一个doc
app.delete('/:email', function(req, res, next){
	var email = req.params.email;
	db.user.remove({email: {$eq: email}}, function(error, result){
		if (error) {
			throw new Error(error);
		}
		res.send(result);
	});
});

module.exports = app;