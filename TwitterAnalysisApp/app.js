var express = require('express');
var path = require('path');
var app = express();

app.get('/', function(req, resp) {
	resp.sendFile('index.html', {root: path.join(__dirname, './html')});
});

app.use('/cssFiles', express.static(__dirname + '/static'));
app.use('/BStrap', express.static(__dirname + '/bootstrap'));

app.listen(3000, function() {
	console.log('Listening at Port 3000');
});