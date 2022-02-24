const mongoose=require('mongoose');
const config = require('./config');

//iniciamos la conexion a la base de datos
mongoose.Promise = global.Promise;
mongoose.connect(config.serverConfig.dbConnection, {
    useUnifiedTopology: true, 
    useNewUrlParser: true,
})
.then( (db) =>  console.log("Conexion exitosa") ) 
.catch( (err) => console.error(err) )
