require('./config/config')
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// controladores
app.use(require('./controllers/usuario'))

mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err) => {
    if (err) throw err;
    console.log('Base de datos online')
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto', 3000)
})