const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const NodeCouchDb = require('node-couchdb');
const app = express();

const couch = new NodeCouchDb({
	auth: {
		user: 'admin',
		password: '123456'
	}
});

const dbName = 'tiny_twitter';
const viewUrl = '/_design/coordinates_all/_view/all_coordinates';

couch.listDatabases().then(function(dbs){
	console.log(dbs);
});

app.use('/cssFiles', express.static(__dirname + '/assets'));
app.use('/BStrap', express.static(__dirname + '/bootstrap'));
app.use('/Script', express.static(__dirname + '/script'));


// app.get('/', function(req, resp) {
// 	resp.sendFile('index.ejs', {root: path.join(__dirname, './Views')});
// });

// app.use('/cssFiles', express.static(__dirname + '/assets'));
app.use('/BStrap', express.static(__dirname + '/bootstrap'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'files'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
	couch.get(dbName, viewUrl).then(
		function(data, headers, status){
			//console.log(data.data.rows);
			res.render('index',{
				customers:data.data.rows
			});
		},
		function(err){
			res.send(err);
		});
});

app.post('/customer/add', function(req, res){
	const name = req.body.name;
	const email = req.body.email;
	
	couch.uniqid().then(function(ids){
		const id = ids[0];
		couch.insert('customers', {
			_id: id,
			name: name,
			email: email
		}).then(
			function(data, headers, status){
				res.redirect('/');
			},
			function(err){
				res.send(err);
			});
	});
});

app.post('/customer/delete/:id', function(req, res){
	const id = req.params.id;
	const rev = req.body.rev;

	couch.del(dbName, id, rev).then(
		function(){
			res.redirect('/');
		},
		function(err){
			res.send(err);
		});
})

app.listen(3000, function(){
	console.log('Sever Started On Port 3000');
});