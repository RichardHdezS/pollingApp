let countSeccions = 0, countOptions = 0;
function addFormSeccion(){
    countSeccions+=1;
    let seccion = document.querySelector('.seccionModel').cloneNode(true);
    seccion.classList.remove('seccionModel');
    seccion.classList.remove('hide');
    seccion.classList.add(`seccion${countSeccions}`);
    seccion.setAttribute('seccion', countSeccions);
    seccion.querySelector('.btnAddOption').setAttribute('btnSeccion',countSeccions)
    document.querySelector('.formBody').appendChild(seccion);
}

function addOption(numSeccion){
    countOptions+=1;
    let newOption = document.querySelector('.optionModel').cloneNode(true);
    newOption.classList.remove('optionModel');
    newOption.classList.remove('hide');
    newOption.classList.add(`option${countOptions}`);
    newOption.querySelector('.selectTypeOption').setAttribute('option', countOptions);
    newOption.querySelector('.Answers').classList.add(`optionAnswer${countOptions}`)
    document.querySelector(`.seccion${numSeccion}`).appendChild(newOption);
}

function chooseTypeOption(typeOption, numOption){
    if(typeOption=='radioButton' || typeOption=='selectItems'){
        document.querySelector(`.optionAnswer${numOption}`).innerHTML=""
        document.querySelector(`.optionAnswer${numOption}`).innerHTML=`
            <div class="form-text">Respuestas de esta opción.(Deben seprarse con ";" cada respuesta)</div>
            <textarea name="answersFromOption" class="form-control inputAnswers" cols="20" rows="3" placeholder="respuesta 1; respuesta 2; respuesta 3"></textarea>
        `
    }else if(typeOption=='g-rango' || typeOption=='g-radios' || typeOption=='g-items'){
        document.querySelector(`.optionAnswer${numOption}`).innerHTML=""
        document.querySelector(`.optionAnswer${numOption}`).innerHTML=`
            <div class="form-text">Respuestas de esta opción.(Deben seprarse con ";" cada respuesta)</div>
            <textarea name="answersFromOption" class="form-control inputAnswers" cols="20" rows="3" placeholder="respuesta 1; respuesta 2; respuesta 3"></textarea>
            <div class="form-text">Esta opcion habilitara un campo de texto en el formulario que funcionara como respuesta alternativa a las anteriormente dadas)</div>                                      
        `
    }else{
        document.querySelector(`.optionAnswer${numOption}`).innerHTML=""
    }
}

function deleteSeccion(event){
    event.target.parentElement.parentElement.parentElement.parentElement.remove();
}

function deleteOption(event){
    event.target.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
}

async function saveForm(event){
    event.preventDefault();
    let newForm = document.querySelector('#newForm');
    let formdata = new FormData(newForm);
    const entries = [...formdata.entries()];
    console.log(entries);

    let data = {
        title:'',
        description:'',
        body:[]
    }

    let numOptions=0;
    let countOpc =0;
    entries.forEach((item, index)=>{
        console.log(data)
        switch(item[0]){
            case 'formTitle':
                data.title =item[1];
                break;
            case 'formDescription':
                data.description = item[1];
                break;
            case 'seccionName':
                if(data.body.length==0){
                    data.body = [
                        {
                            seccionName:item[1],
                            seccionDescription:entries[index+1][1],
                            options:[]
                        }
                    ];
                }else{
                    numOptions+=1;
                    data.body.push({
                        seccionName:item[1],
                        seccionDescription:entries[index+1][1],
                        options:[]
                    })
                }
                break;
            case 'optionName':
                    if(entries[index+2]){
                        let ans={
                            optionName:item[1],
                            typeOption:entries[index+1][1],
                            answers:(entries[index+2][0]=='answersFromOption')?entries[index+2][1]:[]
                        }
                        data.body[numOptions].options.push(ans);
                    }else{
                        let ans={
                            optionName:item[1],
                            typeOption:entries[index+1][1],
                            answers:[]
                        }
                        data.body[numOptions].options.push(ans);
                    }
                break;
        }
    });
    console.log(data);
    await savedForm(data);
}

async function savedForm(data){//hacemos la peticion para validar el logueo de un usuario
    try{
        let result=null;
        await axios.post(`http://localhost:3000/saveForm`, data).then((res)=>{
            result = res.data
        }).catch((err)=>{
            result=err.response.data;
        });
        console.log(result)
        if(result.errors) console.log(result.errors);
            else if(result.done){
                console.log(result.done)
                document.location.href=`http://localhost:3000/home`
            }
    }
    catch(err){
        console.log("Algo ha salido mal al registrar el formulario " + err);
    }
}