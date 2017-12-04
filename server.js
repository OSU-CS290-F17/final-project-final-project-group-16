var http = require('http');
console.log("Starting server...\n")

var fs = require('fs');	
var express = require("express");
var exphbs = require('express-handlebars');
var app = express()
var publicDir = {root: __dirname + "/public/"}
var MongoClient = require('mongodb').MongoClient;

var bodyParser = require("body-parser")

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.json())

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
	var gameDataCollection = mongoConnection.collection('gameData');
	gameDataCollection.find({}).toArray(function (err, results) { 
		if(err) {
			res.status(500).send("Error fetching from DB");
		} else {
			res.status(200).render('gamePage', {
				gameList: results
			});
		}
	});
})

app.get("/library", function (req, res){
	var libraryDataCollection = mongoConnection.collection('libraryData');
	libraryDataCollection.find({}).toArray(function (err, results) { 
		if(err) {
			res.status(500).send("Error fetching from DB");
		} else {
			res.status(200).render('library', {
				libraryGameList: results
			});
		}
	});
});

app.get("/gamePage", function (req, res){
	var gameDataCollection = mongoConnection.collection('gameData');
	gameDataCollection.find({}).toArray(function (err, results) { 
		if(err) {
			res.status(500).send("Error fetching from DB");
		} else {
			res.status(200).render('gamePage', {
				gameList: results
			});
		}
	});
});

app.use(express.static('public'));

app.post("/sell", function (req, res, next){
	if (req.body && req.body.boxArt) {
		var gameDataCollection = mongoConnection.collection('gameData');
		
		gameDataCollection.insert(
			{ price: req.body.price, boxArt: req.body.boxArt, gameTitle: req.body.gameTitle },
			function (err, result){
				if(err){
					res.status(500).send("Error fetching from DB");
				} else {
					res.status(200).send("Success");
				}
			}
		);
    } else {
		res.status(400).send("Request body was missing a field");
	}
})

app.post("/addToLibrary", function (req, res, next){
	if (req.body && req.body.boxArt) {
		var libraryDataCollection = mongoConnection.collection('libraryData');
		
		libraryDataCollection.insert(
			{ price: req.body.price, boxArt: req.body.boxArt, gameTitle: req.body.gameTitle },
			function (err, result){
				if(err){
					res.status(500).send("Error fetching from DB");
				} else {
					res.status(200).send("Success");
				}
			}
		);
    } else {
		res.status(400).send("Request body was missing a field");
	}
})

app.use('*', function (req, res) {
	res.status(404).render("404")
});


MongoClient.connect(mongoURL, function(err, connection) {
	if (err) {
		throw err;
	}
	mongoConnection = connection;
	app.listen(port, function () {
		console.log("Server started, listening on port", port);
	});
});