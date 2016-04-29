var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(90);

function handler(req, res) {
    fs.readFile(__dirname + '/chat.html',
        function(err, data) {
            if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }
        res.writeHead(200);
        res.end(data);
    });
}

io.on('connection', function(socket) {
    // 广播给所有人
    // io.sockets.emit('a', {'name': 'hi, 宁宁'});

    // socket.on('join', function(data){
    //     console.log(data)
    //     // 广播给所有人, 不包括发送源的人
    //     socket.broadcast.emit('b', {'name': '宁宁又来了'});        
    // });
    socket.on('send', function(data){
        console.log(io.sockets.sockets);
        // fs.writeFile('config.json', JSON.stringify(io.sockets.sockets));
        // 广播给所有人, 不包括发送源的人
        socket.broadcast.emit('other_say', data);        
    });

});
//注释
