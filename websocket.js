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

server.addListener('connection', function (conn) {
    console.log('connection....');
    // conns.push(conn);
    conn.addListener('message', function (msg) {
        console.log('前台传的数据: ' + msg);
        // conn.send("jingxiang");
        let n = 0;
        // setInterval(o => {
        //     conn.send(++n);
        // }, 1000)
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
