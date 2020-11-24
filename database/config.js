const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        console.log('proccess :', process.env.DB_CNN)
        await mongoose.connect(process.env.DB_CNN,
             {useNewUrlParser: true,
              useUnifiedTopology: true,
              useCreateIndex: true });
              console.log('DB Online')

    } catch (error) {
        console.log(error);
        throw new Error('Error en la conexión a la bd');

    }
}
 module.exports = {
     dbConnection
 }