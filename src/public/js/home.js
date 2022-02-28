function seeSchoolInfo(){
    Swal.fire({
        title: 'Polling App',
        text: `Instituto Tecnologico Superior de Apatzingan
        Ingeniería en Sistemas Computacionales.\n
        9no Semestre\n
        Residencias Profecionales`,
        imageUrl: '../public/images/itsa.png',
        imageWidth: 400,
        imageHeight: 400,
        imageAlt: 'ITSA',
    })
}

function seeDevInfo(){
    Swal.fire({
        title: 'Polling App',
        text: `Desarrollado por: Ociela Causor Santa Maria
        Ingeniería en Sistemas Computacionales.\n
        9no Semestre\n
        Residencias Profecionales`,
    })
}

function newForm(){
    location.href="http://localhost:3000/new-form";
}


function openForm(formName){//hacemos la peticion con axios
    location.href=`http://localhost:3000/view/${formName}`;
}

function getUrlForm(formName){
    Swal.fire({
        title: '¿Copiar URL?',
        text: 'Copiar la URL para compartir este formulario',
        icon: 'info',
        input:'text',
        inputValue:`http://localhost:3000/form/${formName}`,
        confirmButtonText: 'Copiar!'
    }).then((result) => {
        if (result.isConfirmed) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
                })
                Toast.fire({
                icon: 'success',
                title: 'Copiado al portapapeles'
                })
        }
    })
}

async function deleteForm(id){
    Swal.fire({
        title: '¿Estas seguro de eliminar este formulario?',
        text: "Toda la informacion hacerca de este formulario sera borrada, resaultados, estadisticas, etc.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrar',
        cancelButtonText: 'Cancelar'
        }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
            'Borrado',
            'El formulario ha sido borrado',
            'success'
            )
        }
        })
}