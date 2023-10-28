//File System
const fs = require('fs');
fs.writeFileSync('first.txt', "Hello from Node JS");

const http = require('http');//to import some path to file or module
const server = http.createServer((req,res)=>{
    console.log(req);
});
server.listen(3000);






