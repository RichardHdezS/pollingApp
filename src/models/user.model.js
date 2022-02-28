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
});


//creamos un metodo para usurios. Este metodo permitira cifrar las constraseñas
userSchema.methods.encryptPassword =  async(password) =>{
    const salt = await bcrypt.genSalt(10)//aplicaremos 10 veces el algoritmo
    return await bcrypt.hash(password, salt);// hasheamos al contraseña con el salt generado
}

//este metodo permitira descifrar y comparar las contraseñas
userSchema.methods.comparePassword =  async function(password){
    return await bcrypt.compare(password, this.password)//si la contraseña es correcta, retorna true o false
}

const Users = new mongoose.model('users', userSchema);
module.exports = Users;