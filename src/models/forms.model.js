const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const formSchema = new Schema({
    title:String,
    description:String,
    body:[]
},
{
    collection:'forms',
    timestamps: true,//por default se insertara la fecha y hora de creacion del registro,
    versionKey: false//no nostramos la version del registro
});

const Forms = new mongoose.model('forms', formSchema);
module.exports = Forms;