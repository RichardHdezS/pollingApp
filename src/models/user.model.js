const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    nombre:{
        type:String,
        required: true
    },
    apellidoP:{
        type:String,
        required: true
    },
    apellidoM:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    numCtrl:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    rol:String
},
{
    collection:'users',
    timestamps: true,//por default se insertara la fecha y hora de creacion del registro,
    versionKey: false//no nostramos la version del registro
})