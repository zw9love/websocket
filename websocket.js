// import { setInterval } from 'timers';
let express = require('express');
let opn = require('opn');
let fs = require("fs")
let multipart = require('connect-multiparty')
let multipartMiddleware = multipart()
// import express from 'express'
let app = express()
let serverInfo = {
    port: 6789
}

let clients=[];

let conns = [];

let ws = require('ws').Server;

let server = new ws({ port: 9090 });

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
    // CLIENTS.push(conn);
    console.log('connection....');

    // var index = clients.push(conn) - 1;
    // console.log(index)
    // conns.push(conn);
    let n = 0;
    setInterval(o => {
        ++n
        let postData = {
            name: '在线客服08号-小张',
            content: 'test' + n + '😂',
            time: getTime()
        }
        conn.send(JSON.stringify(postData));
    }, 5000)

    conn.addListener('message', function (msg) {
        msg = JSON.parse(msg)
        console.log(msg);
        // conn.send("jingxiang");
        // for(var i=0; i<conns.length; i++){
        //     if(conns[i]!=conn){
        //         conns[i].send(msg);
        //     }
        // }
    });

    conn.addListener('close', function (a, b) {
        console.log('监听到conn被close。')
        clients.splice(clients.indexOf(conn), 1)
        // conn.close()
        // conn.close(404, '前端关闭页面')
        // server = new ws({ port: 9090 });
        // CLIENTS.splice(CLIENTS.indexOf(conn), 1)
        // console.log(a)
        // console.log(b)
    });
    conn.addListener('error', function (a, b) {
        console.log('监听到conn的error。')
        clients.splice(clients.indexOf(conn), 1)
        // clients.splice(index, 1);
        // conn.close()
        // conn.close(404, '前端关闭页面')
        // server = new ws({ port: 9090 });
        // CLIENTS.splice(CLIENTS.indexOf(conn), 1)
        // console.log(a)
        // console.log(b)
    });
});

server.addListener('error', function (a, b) {
    console.log('监听到server的error。')
    console.log(a)
    console.log(b)
})

app.get('/', (request, response, next) => {
    // console.log('进来了根页面')
    fs.readFile('websocket.html', function (err, data) {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(data.toString())
    })
})

app.post('/test', (request, response, next) => {
    console.log('进来了test接口。')
    response.json([{name: '大熊', age: 30}, {name: '静香', age: 28}, {name: '胖虎', age: 33}])
})

app.post('/sendPhoto', multipartMiddleware, (request, response, next) => {
    console.log('进来了sendPhoto接口。')
    console.log(request.body)
    console.log(request.files)
    response.json({msg: '成功'})
})

app.listen(serverInfo.port, function () {
    let uri = 'http://localhost:' + serverInfo.port
    console.log("Listening at: " + uri)
    // opn(uri)
})

console.log('ws://localhost:9090 running......');
