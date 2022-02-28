let btnLognin = document.querySelector('.buttonLognIn');
let inputEmail = document.querySelector('#inputEmail');
let inputPass = document.querySelector('#inputPassword');

btnLognin.addEventListener('click', async (event)=>{
    event.preventDefault();
    let data = {
        email:inputEmail.value,
        password:inputPass.value
    }
    await signIn(data);
})
async function signIn(userData){//hacemos la peticion para validar el logueo de un usuario
    try{
        let result=null;
        await axios.post(`http://localhost:3000/signin`, userData).then((res)=>{
            result = res.data
        }).catch((err)=>{
            result=err.response.data;
        });
        console.log(result)
        if(result.token && result.access) document.location.href=`http://localhost:3000/home`
    }
    catch(err){
        console.log("Algo ha salido mal al iniciar sesion " + err);
    }
}