var http = require('http');
console.log("Starting server...\n")

var fs = require('fs');	
var express = require("express")
var app = express()
var publicDir = {root: __dirname + "/public/"}
var error404page = "" // the filename of the 404 page located in /public directory
var MongoClient = require('mongodb').MongoClient;

var port = 3000;
if(process.env.PORT!=null){
	port = process.env.PORT;
}

var mongoHost = process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = process.env.MONGO_USER;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = process.env.MONGO_DB;
var mongoURL = 'mongodb://' + mongoUser + ':' + mongoPassword +
  '@' + mongoHost + ':' + mongoPort + '/' + mongoDBName;
  
 var mongoConnection = null;

app.get("/", function (req, res){
	res.status(200)
	res.sendFile("index.html", publicDir, function(err){
		if (err){
			throw(err)
		}
	})
})

app.use(express.static('public'));

app.use('*', function (req, res) {
	res.status(404)
	res.sendFile(error404page, publicDir, function(err){
		if (err){
			throw(err)
		}
	})
});

MongoClient.connect(mongoURL, function(err, connection) ) {
	if (err) {
		throw err;
	}
	mongoConnection = connection;
	app.listen(port, function () {
		console.log("Server started, listening on port", port);
	});
});
