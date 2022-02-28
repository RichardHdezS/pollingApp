require('./connection'); //* Importamos el conectyor de la BD

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const config = require('./config');

//Servidor
const app = express();

//Inicializamos las rutas
const indexRoutes = require('./routes/index.routes');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(session({
    secret:config.serverConfig.secret,
    resave: true,
    saveUninitialized: true,
}));

//importamos las rutas
app.use('/', indexRoutes)

//settings
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/public',express.static(path.join(__dirname, "public")));

//port config
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), ()=>{
    console.log(`listen in port ${app.get('port')}`);
})