let formRegister  = document.getElementById('registerUser');

formRegister.addEventListener('submit', async (event)=>{
    event.preventDefault();
    let data = {
        nombre:document.querySelector('#inputName').value,
        apellidoP: document.querySelector('#inputApeliidoP').value,
        apellidoM:document.querySelector('#inputApeliidoM').value,
        numCtrl: document.querySelector('#inpuNumCtrl').value,
        email: document.querySelector('#inputEmail').value,
        password: document.querySelector('#inputPassword').value,
        confirmPassword: document.querySelector('#inputConfirmPassword').value,
    }
    //console.log(data)
    await signUp(data);
});

async function signUp(userData){//hacemos la peticion para validar el logueo de un usuario
    try{
        let result=null;
        await axios.post(`http://localhost:3000/signup`, userData).then((res)=>{
            result = res.data;
        }).catch((err)=>{
            result=err.response.data;
        });
        console.log(result)
        if(result.token && result.access) document.location.href=`http://localhost:3000/`
    }
    catch(err){
        console.log("Algo ha salido mal al iniciar sesion " + err);
    }
}