/*  B"H
*/
// Load the http module to create an http server.
const express = require('express')
const productsController = require('./controllers/products')

const PORT = 8000

const app = express();

app
  .get('/', (req, res) => {
    res.send('Hello New Paltz, NY!!!')
  })
  .use('/api/v1/products', productsController)

// Listen on port 8000, IP defaults to
//
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`)
});



console.log('Hello World!')

/* 
  Ways to send data to the server
  1. PATH parameters: /users/123
  2. Query parameters: ?name=John&age=30
  3. Headers
    3.5. Cookies
  4. Request body: { "name": "John", "age": 30 }
    4.0. Form data: name=John&age=30
    4.5. JSON data: { "name": "John", "age": 30 }

*/

/* 
  parts of a url
  1. Protocol: http:// or https://
  2. Domain: www.example.com
  3. Port: :80 or :443
  4. Path: /path/to/resource
  5. Query parameters: ?name=John&age=30
  6. Fragment: #section1

  example: https://www.example.com:80/path/to/resource?name=John&age=30#section1
*/

/*
  Module Types
    1. CommonJS:
      import: require('module')
      export: module.exports = { functions, variables, etc. }
    2. ES6:
      import: import { functions, variables, etc. } from 'module'
      export: export { functions, variables, etc. }
*/