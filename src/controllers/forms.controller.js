//Este archivo manejara las funciones para manejar os fomularios
const Forms = require('../models/forms.model')

function newForm(req, res){
    if(req.session.userToken){
        return res.render('newForm')
    }else{
        return res.status(401).redirect('/')
    }
}

async function viewForm(req, res){
    try{
        if(req.session.userToken){
            const form =  await Forms.find({title:req.params['formName']});
            if(form.length!=0) return res.render('viewForm', {form:form[0]});
                else return res.render('viewForm', {form:null});
        }
        else{
            return res.status(401).redirect('/');
        }
    }catch(err){
        console.log("Algo ha salido al visualizar el formulario ", err);
        return res.status(500).json({errors:[{msg:"Algo salio mal al visualizar el formulario"}]})
    }
}

async function saveForm(req, res){
    try{
        console.log(req.body)
        const miForm = new Forms(req.body);
        const formSaved = await miForm.save();
        if(formSaved) return res.status(200).json({done:"hecho, se ha guarado correctamente"}) 
            else return res.status(401).json({errors:[{msg:"Algo salio mal al registrarse"}]})
    }catch(err){
        console.log(err);
        return res.status(500).json({errors:[{msg:"Algo salio mal al registrarse"}]})
    }
}

module.exports={
    viewForm,
    newForm,
    saveForm
}