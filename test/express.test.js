/**
 * Created on 2016/3/23.
 */
var expect = require('chai').expect;
var superAgent = require('superagent');
var db = require('../common/db/db.config').db;
var url = 'http://localhost:3000';
describe('express rest api server', function(){
	it('retrives a collection', function(done){
		var userCollection = db.collection('user');
		expect(userCollection).to.be.an('object');
		done();
	});

	it('remove all data from user', function(done){
		db.bind('user');
		db.user.remove({}, function(error, result){
			expect(error).to.be.equal(null);
			console.log(result);
			done();
		});
	});

	it('count object', function(done){
		var path = '/user/counter';
		superAgent.get(url + path)
			.send()
			.end(function(error, result){
				expect(error).to.be.equal(null);
				console.log(result);
				//expect(result.count).to.be.equal(0);
			});
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
				expect(error).to.be.equal(null);
				console.log(result);
				expect(result.body.result.ok).to.be.equal(1);
				expect(result.body.insertedCount).to.be.equal(1);
				id = result.body.insertedIds;
				done();
			});
	});

	it('count object', function(done){
		var path = '/user/counter';
		superAgent.get(url + path)
			.send()
			.end(function(error, result){
				expect(error).to.be.eq(null);

			});
		done();
	});

	it('retrives an object', function(done){
		var path = '/user';
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