//Este archivo manejara las funciones para manejar os fomularios
const Forms = require('../models/forms.model')

function newForm(req, res){
    if(req.session.userToken){
        return res.render('newForm')
    }else{
        return res.status(401).redirect('/')
    }
}

function viewForm(req, res){
    //TODO obtener la informacion de este formulario y pasarlo a la vista para renderizarlo
    if(req.session.userToken){
        const formName = req.params['formName'];
        return res.render('viewForm', {
            name: formName
        });
    }
    else{
        return res.status(401).redirect('/');
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