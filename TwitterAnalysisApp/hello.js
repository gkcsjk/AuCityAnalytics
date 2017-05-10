const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const NodeCouchDb = require('node-couchdb');
const app = express();

const couch = new NodeCouchDb({
	port: 15984,
	auth: {
		user: 'ccc',
		password: 'cloud'
	}
});

// const dbName = 'tiny_twitter';
// const viewUrl = '/_design/coordinates_all/_view/all_coordinates';

const dbName = 'emlbourne_ans';
const viewUrl = '_design/melbourme_view/_view/lang_withcoor';


const MelbourneDB = 'emlbourne_ans';
const MelbourneUrl = '_design/melbourme_view/_view/time_emotion?reduce=true&group_level=3';

const AdelaideDB = 'adelaide_ans';
const AdelaideUrl = '_design/adelaide_view/_view/time_emotion?reduce=true&group_level=3';

const SydneyDB = 'sydney_ans';
const SydneyUrl = '_design/sydney_view/_view/time_emotion?reduce=true&group_level=3';

const BrisbaneDB = 'brisbane_ans';
const BrisbaneUrl = '_design/brisbane_view/_view/time_emotion?reduce=true&group_level=3';

const PerthDB = 'perth_ans';
const PerthUrl = '_design/perth_view/_view/time_emotion?reduce=true&group_level=3';

const CanberraDB = 'canberra_ans';
const CanberraUrl = '_design/canberra_view/_view/time_emotion?reduce=true&group_level=3';

const airlineDB = 'result_airline';
const airlineUrl = '_design/airline/_view/airlineView';



couch.listDatabases().then(function(dbs){
	console.log(dbs);
});

app.use('/cssFiles', express.static(__dirname + '/static'));
app.use('/BStrap', express.static(__dirname + '/bootstrap'));
app.use('/Img', express.static(__dirname + '/img'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
	res.sendFile('home.html', {root: path.join(__dirname, './views')});
});

app.get('/app1', function(req, res){
	var a = [];
    
    //Melbourne
	couch.get(MelbourneDB, MelbourneUrl).then(function(data, headers, status){
        a.push( data.data.rows);
        console.log("melb");
        
        couch.get(AdelaideDB, AdelaideUrl).then(function(data, headers, status){
            a.push( data.data.rows);	
            console.log("adel");
            
            couch.get(BrisbaneDB,BrisbaneUrl).then(function(data,headers,status){
                a.push(data.data.rows);
                console.log("bris");
                
                couch.get(SydneyDB, SydneyUrl).then(function(data,headers,status){
                    a.push(data.data.rows);
                    console.log("syd");
                    
                    couch.get(PerthDB,PerthUrl).then(function(data,headers,status){
                        a.push(data.data.rows);
                        console.log("pert");
                        
                        couch.get(CanberraDB,CanberraUrl).then(function(data,headers,status){
                            a.push(data.data.rows);
                            console.log("canb");
                            
                            res.render("app1", {a:a});
                        
                        },function(err){res.send(err)});
                    },function(err){res.send(err)});
                },function(err){res.send(err)});
            },function(err){res.send(err)});
        },function(err){res.send(err);});
    },function(err){res.send(err)});
});



app.get('/app2', function(req, res){
	couch.get(dbName, viewUrl).then(
		function(data, headers, status){
			// console.log(data.data.rows);
			res.render('app2',{
				emlbourne_ans: data.data.rows
			});
		},
		function(err){
			res.send(err);
		});
});

app.get('/app3', function(req, res){
	couch.get(airlineDB, "6d60ba402d7b18e556e30b7bf4655a0e").then(
		function(data, headers, status){
			console.log(data.data.value);
			
			res.render('app3',{
				airlineDB:data.data.value
			});
		},
		function(err){
			res.send(err);
		});
});



app.listen(3000, function(){
	console.log('Sever Started On Port 3000');
});