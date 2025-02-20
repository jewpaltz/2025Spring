/*  B"H
*/
// Load the http module to create an http server.
const express = require('express')
const PORT = 8000

const app = express();

app.get('/', (req, res) => {
  res.send('Hello New Paltz, NY!!!')
})

// Listen on port 8000, IP defaults to
//
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`)
});



console.log('Hello World!')