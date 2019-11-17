var path = require('path')
var http = require('http');
var fs   = require('fs');

var dir = path.join(__dirname, 'public')

http.createServer(function (req, res) {

  console.log(req.url)
  console.log(dir + req.url)

  var tempPath = dir + req.url
  do {
    tempPath = tempPath.replace('/', '\\')
  }
  while (tempPath.search('/') > 0)

  console.log(tempPath)

  if (req.url ==  "/" ) {
    fs.readFile('../views/index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  if (req.url == '/projects/index.html') {
    console.log("hit projects/html")
    fs.readFile('../../index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }

  // var files = fs.createReadStream(tempPath)
  // files.on('open', () => {
  //   files.pipe(tempPath)
  // })

}).listen(2222);

console.log('running');
