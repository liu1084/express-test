/**
 * Created by liqing on 2016/4/24.
 */
var express = require('express');
var db = require('../common/db/db.config').db;
var areas = db.bind('areas');
var app = express();

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

app.post('/', function(req, res){
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost:27017/test');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function(){
        var areaSchema = mongoose.Schema({
            id: Number,
            name: String,
            cities: [{
                parentId: Number,
                id: Number,
                name: String,
                zones: [{
                    parentId: Number,
                    id: Number,
                    name: String
                }]
            }]
        });
        var AreaModel = mongoose.model('AreaModel', areaSchema);
        var liaoning = new AreaModel();
        liaoning.id = 1;
        liaoning.name = 'Liaoning';
        liaoning.cities = [];
        var dalian = {
            parentId: liaoning.id,
            id: 11,
            name: 'Dalian',
            zones: []
        };

        var ganjingzi = {
            parentId: dalian.id,
            id: 111,
            name: 'ganjingzi'
        };

        dalian.zones.push(ganjingzi);

        liaoning.cities.push(dalian);

        liaoning.save(function(){});

        AreaModel.find({"cities.parentId": 1}, function(err, areas){
            if (err){
                throw new Error(err);
            }
            res.send(areas);
        });

    });
});

app.get('/', function(req, res){
    areas.find().toArray(function(error, provinces){
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

    db.areas.find({'cities.parentId': provinceId}).toArray(function(err, provinces){
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