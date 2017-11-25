var http = require('http');
var fs = require('fs');	
var indexHTMLContent = fs.readFileSync('public/index.html', 'utf8');
var indexJSContent = fs.readFileSync('public/index.js', 'utf8');
var styleContent = fs.readFileSync('public/style.css', 'utf8');

var port = 3000;
if(process.env.PORT!=null){
  port = process.env.PORT;
}

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