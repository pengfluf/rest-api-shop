const http = require('http');

const PORT = process.env.PORT || 3002;

const server = http.createServer();

server.listen(PORT);

console.log(`Server is listening on localhost:${PORT}`);
