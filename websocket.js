// import { setInterval } from 'timers';
let express = require('express');
let opn = require('opn');
let fs = require("fs")
// import express from 'express'
let app = express()
let serverInfo = {
    port: 6789
}

var conns = [];

var ws = require('ws').Server;

var server = new ws({ port: 9090 });

function getDouble(val){
    val = val + ''
    if(val.length > 1){
        return val
    }else{
        return '0' + val
    }
}

function getTime(){

    let date = new Date()

    return date.getFullYear() + '-' + getDouble(date.getMonth() + 1) + '-' + getDouble(date.getDate()) + ' ' + getDouble(date.getHours()) + ':' + getDouble(date.getMinutes())  + ':' + getDouble(date.getSeconds())
}


server.addListener('connection', function (conn) {
    console.log('connection....');
    // conns.push(conn);
    let n = 0;
    setInterval(o => {
        ++n
        let postData = {
            name: '在线客服08号-小张',
            content: 'test' + n + '<img class="emoji_icon" src="dist/img/emoji/' + n + '.png">',
            time: getTime()
        }
        conn.send(JSON.stringify(postData));
    }, 5000)
    conn.addListener('message', function (msg) {
        msg = JSON.parse(msg)
        console.log(msg.time);
        console.log(msg.content);
        console.log(msg.name);
        // conn.send("jingxiang");
        // for(var i=0; i<conns.length; i++){
        //     if(conns[i]!=conn){
        //         conns[i].send(msg);
        //     }
        // }
    });
});

app.get('/', (request, response, next) => {
    // console.log('进来了根页面')
    fs.readFile('websocket.html', function (err, data) {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(data.toString())
    })
})

app.listen(serverInfo.port, function () {
    let uri = 'http://localhost:' + serverInfo.port
    console.log("Listening at: " + uri)
    opn(uri)
})

console.log('ws://localhost:9090 running......');
