let btnLognin = document.querySelector('.buttonLognIn');
let inputEmail = document.querySelector('#inputEmail');
let inputPass = document.querySelector('#inputPassword');

// btnLognin.addEventListener('click', (event)=>{
//     event.preventDefault();
//     let data = {
//         user:inputEmail.value,
//         password:inputPass.value
//     }
//     signIn(data)
// })
// async function signIn(userData){//hacemos la peticion para validar el logueo de un usuario
//     try{
//         let result=null;
//         await axios.post(`http://localhost:3000/signin`, userData).then((res)=>{
//             result = res.data
//         }).catch((err)=>{
//             result=err.response.data;
//         });
//         alert(result);
//     }
//     catch(err){
//         console.log("Algo ha salido mal al iniciar sesion " + err);
//     }
// }