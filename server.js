var http = require('http');
console.log("Starting server...\n")

var fs = require('fs');	
//var indexHTMLContent = fs.readFileSync('public/index.html', 'utf8');
//var indexJSContent = fs.readFileSync('public/index.js', 'utf8');
//var styleContent = fs.readFileSync('public/style.css', 'utf8');
var express = require("express")
var app = express()
var publicDir = {root: __dirname + "/public/"}
var error404page = "" // the filename of the 404 page located in /public directory

var port = 3000;
if(process.env.PORT!=null){
	port = process.env.PORT;
}

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

app.listen(port, function () {
	console.log("Server started, listening on port", port);
});


/*
var server = http.createServer(function (req, res) {
  console.log("== Request made");
  console.log("  - method:", req.method);
  console.log("  - path:", req.url);
  console.log("  - headers:", req.headers);
  console.log("");
  
  console.log("== MY_ENV_VARIABLE:", process.env.PORT);

  if(req.url == "/index.html"){
	res.writeHead(200, {
	  "Content-Type": "text/html"
    });
	res.write(indexHTMLContent);
  }
  else if(req.url == "/index.js"){
	res.writeHead(200, {
	  "Content-Type": "text/javascript"
    });
	res.write(indexJSContent);
  } 
  else if(req.url == "/style.css"){
	res.writeHead(200, {
	  "Content-Type": "text/css"
    });
	res.write(styleContent);
  }
  else if(req.url == "/"){
	res.writeHead(200, {
	  "Content-Type": "text/html"
    });
	res.write(indexHTMLContent);
  }

  res.end();

});

server.listen(port, function () {
  console.log("== Server listening on port:", port);
});
*/