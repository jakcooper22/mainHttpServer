var http = require('http');
var fs   = require('fs');

http.createServer(function (req, res) {

  console.log(req.url)

  if (req.url ==  "/" ) {
    fs.readFile('../views/indexTest.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }else {
    res.end();
  }

  console.log('processed some stuff');
}).listen(1111);

console.log('running');
