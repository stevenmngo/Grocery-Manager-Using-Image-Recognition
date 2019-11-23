const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
// var Database = require('./Utils/connect')
// var tripRoute = require('./routes/Trip')
var item = require('./routes/item')
var user = require('./routes/user')

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// Test Route
// app.get('/', (req, res) => res.send('Travel App API'))
// app.get('/hello', (req, res) => res.send({ name: "zzz" }))

// item Route
app.use('/item', item)

// user Route
app.use("/user", user);



// Create the port listen at port 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))