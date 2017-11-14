var conns = [];  
   
var ws = require('ws').Server;  
   
var server = new ws({port:9090});  
   
server.addListener('connection', function(conn){  
    console.log('connection....');  
       
    // conns.push(conn);  
    conn.addListener('message',function(msg){  
        console.log(msg);  
        conn.send("jingxiang");
        // for(var i=0; i<conns.length; i++){  
        //     if(conns[i]!=conn){  
        //         conns[i].send(msg);  
        //     }  
        // }  
    });  
});  
   
console.log('running......');  