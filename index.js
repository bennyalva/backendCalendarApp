const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config(); // to use environments .env
const cors = require('cors');

// create node express
const app = express();

// base de datos

dbConnection();

// cors 
app.use(cors())
// directorio publico
app.use(express.static('public'));

// lectura de parseo
app.use(express.json())

// rutas
app.use('/api/auth', require('./routes/auth'))

// listen request
app.listen(process.env.PORT, () => {
    console.log('server runing on port 4000')
});