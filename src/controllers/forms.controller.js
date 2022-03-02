//Este archivo manejara las funciones para manejar os fomularios
const Forms = require('../models/forms.model')

function renderView_newForm(req, res){
    if(req.session.userToken){
        return res.render('newForm')
    }else{
        return res.status(401).redirect('/')
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

//renderView_editForm
async function renderView_editForm(req, res){
    if(req.session.userToken){
        let forName = req.params['formName'];
        let form = await Forms.find({title:forName});
        if(form.length!=0) return res.render('editForm',{form:form[0]});
            else return res.render('editForm',{form:null});
    }else{
        return res.status(401).redirect('/')
    }
}

async function updateForm(req, res){
    try{
        if(req.session.userToken){
            const { title, description, body } = req.body;
            await Forms.findOneAndUpdate({_id:req.params['formId']},{
                $set:{
                    title: title,
                    description:description,
                    body:body
                }
            },(err, numAffected)=>{
                if(err) throw new Error('Error al actualizar el formulario');
                console.log(numAffected)
            }).clone().catch(function(err){ console.log(err)});
            return res.status(201).json({done:"El formulario ha sido actualizado correctamente"});
        }else{
            return res.status(401).redirect('/');
        }
    }catch(err){
        console.log(`Algo ha ocurrido al actualizar el formuario ${err}`)
        return res.status(500).json({errors:[{msg:`Algo salió mal al actualizar formulario`}]})
    }
}

async function deleteForm(req, res){
    try{
        if(req.session.userToken){
            await Forms.deleteOne({_id:req.params['formId']}, async(err, numAffected)=>{
                if(err) throw new Error(err);
                    else{
                        console.log(numAffected);
                    }
            }).clone().catch(function(err){ console.log(err)});
            return res.status(200).json({done:'El mensaje ha sido eliminado correctamente'});
        } else{
            return res.status(401).redirect('/');
        }
    }catch(err){
        console.log(`Algo ha ocurrido al eliminar el formuario ${err}`)
        return res.status(500).json({errors:[{msg:`Algo salió mal al eliminar formulario`}]})
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

module.exports={
    viewForm,
    renderView_newForm,
    saveForm,
    renderView_editForm,
    updateForm,
    deleteForm
}