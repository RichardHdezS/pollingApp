async function signIn(req, res){
    console.log(req.body)
    res.render('home');
}

async function signUp(){
    console.log(req.body)
    res.status(200).send('Todo okay en register');
}

function lognIn(req, res){
    res.status(200).render('login');
}

function register(req, res){
    res.status(200).render('register');
}

module.exports = {
    signIn,
    signUp,
    lognIn,
    register
}