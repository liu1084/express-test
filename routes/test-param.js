/**
 * Created on 2016/3/23.
 */
var express = require('express');
var app = express();

app.get('/test/:id', function(req, res, next){
	res.send(JSON.stringify(req.user));
});

//这里app.param在路由中出现id参数的时候，会调用里面的回调函数
app.param('id', function(req, res, next){
	req.user = {id: 1, name: "liujun"};
	next();
});

module.exports = app;