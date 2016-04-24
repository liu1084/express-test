/**
 * Created on 2016/3/23.
 */
var mongoskin = require('mongoskin');
exports.db = mongoskin.db('mongodb://localhost:27017/areas', {native_parser: true});