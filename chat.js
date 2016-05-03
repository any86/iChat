var fs = require('fs');
var open = require('open');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var users = [];

//配置端口
var port = process.env.PORT || 3000;
app.use(express.static('res'));
console.log('iChat 正在运行...');

// 千万别通过express的app启动
http.listen(90);

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/view/chat.html');
});



// open('http://192.168.18.60:90');

io.on('connection', function(socket) {
    // 广播给所有人
    // io.sockets.emit('a', {'name': 'hi, 宁宁'});

    // socket.on('join', function(data){
    //     console.log(data)
    //     // 广播给所有人, 不包括发送源的人
    //     socket.broadcast.emit('b', {'name': '宁宁又来了'});        
    // });

    socket.on('signIn', function(data){
        data.scoket = socket;
        data.dialog = [];
        users.splice(0, 0, data);
        // socket.broadcast.emit('signInOne', {a: 1});     
        console.log('登录用户: ' + users);
    });




    socket.on('sendToOne', function(data){
        console.log(io.sockets.sockets);
        // fs.writeFile('config.json', JSON.stringify(io.sockets.sockets));
        // 广播给所有人, 不包括发送源的人
        // socket.broadcast.emit('other_say', data);        
    });

});
//注释
