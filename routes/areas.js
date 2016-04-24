/**
 * Created by liqing on 2016/4/24.
 */
var express = require('express');
var db = require('../common/db/db.config').db;
db.bind('areas');
var app = express();

//…Ë÷√øÁ”Ú∑√Œ 
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    if (req.method !== 'OPTIONS'){
    }
    next();
});

app.get('/', function(req, res){
    db.areas.find().toArray(function(error, provinces){
        if (error){
            throw new Error(error);
        }

        res.send(provinces);
    })
});

app.get('/province/:provinceId', function(req, res){
    var provinceId = req.params.provinceId;

    if (!provinceId){
        throw new Error('No province id or city id');
    }

    db.areas.find().next(function(err, all){
        var provinces = all.cities.filter(function(city){
            return city.parentId === provinceId;
        });

        res.send(provinces);
    });

});

app.get('/city/:cityId', function(req, res){
    var cityId = req.params.cityId;

    if (!cityId){
        throw new Error('No province id or city id');
    }

    var options = {"zones.parentId": cityId};
    db.areas.find(options).toArray(function(err, provinces){
        if (err){
            throw new Error(err);
        }

        res.send(provinces);
    })
});

module.exports = app;