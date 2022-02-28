//Este archivo manejara las funciones para manejar os fomularios

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

module.exports={
    viewForm,
    newForm
}