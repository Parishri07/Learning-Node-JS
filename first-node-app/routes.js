const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === "/") {
        res.write('<html>');
        res.write('<head>Enter message</head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="msg"></input><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if (url === "/message" && method === "POST") {
        const body = [];
        req.on('data', (chunk) => {
            // console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            // fs.writeFileSync('message.txt', message); //sync stands for synchronous, blocks execution of next line of code until that operation is done
            fs.writeFile('message.txt', message, (err)=>{
                res.statusCode = 302; //this implies that the page is redirected
                res.setHeader('Location', '/');
                return res.end();
            });
        })
    }
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>');
    res.write('<head>My first page</head>');
    res.write('<body><h1>Learning Node</h1></body>');
    res.write('</html>');
    res.end();
}

// module.exports = requestHandler

// module.exports = {
//     handler: requestHandler,
//     someText: 'Hello'
// };

// module.exports.handler = requestHandler;
// module.exports.someText = 'text';

exports.handler = requestHandler;
exports.someText = 'text';
