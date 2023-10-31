const http = require('http');//require keyword is used to import some path to file or module

const routes = require('./routes')

console.log(routes.someText)
const server = http.createServer(routes.handler)

server.listen(3000);





