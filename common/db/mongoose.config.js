var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/areas');
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
    var dalian = {
        parentId: liaoning.id,
        id: 11,
        name: 'Dalian'
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
        console.log(areas);
    });

});
