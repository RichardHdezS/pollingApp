function viewAnswers(req, res){
    if(req.session.userToken){
        const formName =  req.params['formName'];
        //TODO obtenemos los datos del formulario para renderizarlos
        return res.status(200).render('formAnswers');
    }else{
        return res.status(401).redirect('/');
    }
}

module.exports ={
    viewAnswers
}