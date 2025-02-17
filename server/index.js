/*  B"H
*/
// Load the http module to create an http server.
const http = require('http')
const PORT = 8000

// Configure our HTTP server to respond with Hello World to all requests.
const server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Hello World\n');
});

// Listen on port 8000, IP defaults to
//
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});



console.log('Hello World!');