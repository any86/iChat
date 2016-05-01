var express = require('express');
var app = express();
var open = require('open');

app.get('/hello', function(req, res) {
    res.send('Hello World!');
});

app.use(express.static('public'));

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    open('http://127.0.0.1:3000/hello');
    // console.log('Example app listening at http://%s:%s', host, port);
});
