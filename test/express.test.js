/**
 * Created by neusoft on 2016/3/23.
 */
var expect = require('expect');
var superAgent = require('superagent');
var url = 'http://localhost:3000';
describe('express rest api server', function(){
	it('retrives a collection', function(done){
		done();
	});

	it('create an object',function(done){
		var path = '/user';
		superAgent.post(url + path)
			.send({
				name: 'liqing',
				email: 'lee0915@163.com'
			})
			.end(function(error, result){
				expect(error).to.eql(null);
				expect(result.body.length).to.eql(1);
				var _id = result.body[0]._id;
				expect(_id.length).to.eql(24);
				id = _id;
				done();
			});
	});

	it('retrives an object', function(done){
		var path = '/user';
		superAgent.get(url + path + '/' + id)
			.end(function(error, result){
				expect(error.length.to.eql(0));
				expect()
				expect(result.body[0].length.to.eql(1));
				expect(result.body[0]._id = id);
			});
		done();
	});

	it('update an object', function(done){
		done();
	});

	it('check an updated object', function(done){
		done();
	});

	it('delete an object', function(done){
		done();
	});

});