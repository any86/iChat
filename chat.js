var fs = require('fs');
var open = require('open');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var _ = require('underscore');
var users = [];
var user_sockets = {};

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
        //判断用户是否在线
        if(-1 == _.findIndex(users, data)){
            // 用户socket集合
            user_sockets[data.nickname] = socket;
            // 添加用户信息
            users.splice(0, 0, data);
            // 告知其他人该用户(我)已登录
            socket.broadcast.emit('otherSignIn', data);
            console.log(data);
        } else {
            socket.emit('loginStatus', {'status': 1, 'info': '已登录'})
            console.log(data.nickname + '已登录');
        }
    });

    socket.on('send', function(data){
        var nickname = data.to.nickname; // 接受方昵称
        user_sockets[nickname].emit('receive', data);
    });

});
//函数
