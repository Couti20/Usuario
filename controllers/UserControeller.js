class UserController {
    
  constructor(formId, tableId){
        //elemento
    this.formEl = document.getElementById(formId);
    this.tableEl = document.getElementById(tableId);

    this.onSubmit();
    this.onEdit();

  };
  onEdit(){
    
    document.querySelector("#box-user-update .btn-cancel").addEventListener("click", e=>{
 
        this.showPanelCreate();

    });

  }

onSubmit(){


    this.formEl.addEventListener("submit",  event => {
    
        event.preventDefault();

        let btn = this.formEl.querySelector("[type=submit]")
        btn.disabled = true;
          
        let values = this.getValues();

        if(!values) return false;
                      //enão
        this.getphoto().then(
          (content)=>{
        
            values.photo = content;

            this.addLine(values );

            this.formEl.reset();

            btn.disabled = false;
        },
         (e) => {
        
          console.error(e);
        }
        );

    });
}

getphoto(){

  return new  Promise((resolve, reject)=>{

    let fileReader = new FileReader();

  let elements = [...this.formEl.elements].filter(item=>{
    if (item.name === "photo"){
      return item;
    }
  });

  let file = (elements[0].files[0])

  fileReader.onload = () =>{
 //calback/execução de rotina
   resolve(fileReader.result)
  };

  fileReader.onerror = (e) =>{
  
  reject(e);

  };
  
  if (file){
  fileReader.readAsDataURL(file);
} else{
  resolve('dist/img/boxed-bg.jpg');
}

  });

}


  //getValues = passa field por field.
  getValues(){
//let so vai existir dentro getvalues    
    let user = {};
    let isValid = true;


    [...this.formEl.elements].forEach(function(field, index){
                              //indeOf=>Realiza buscas dentro de um 'array'.
      if(['name', 'email', 'password'].indexOf(field.name) > -1 && !field.value){
        
        (field.parentElement.classList.add('has-error'))
        isValid - false;
      }

        if(field.name =="gender"){
            if(field.checked){
         user[field.name] = field.value
     };
     
            
        }else if (field.name == "admin"){
          
          user[field.name] = field.checked

        } else{
           user[field.name] = field.value
    
        } 
          
     }); 
     
     if(!isValid) {

      return false;
     }
     //instância->representante
      //objeto e uma  intância de uma class.var. 
     return new User( 
      user.name,
       user.gender,
        user.birth,
         user.country,
          user.email, 
          user.password,
           user.photo,
            user.admin
            );
          
  }

  addLine(dataUser) {
    /*condiçao == true/ //?entao //:sanão*/
    let tr = document.createElement('tr');

    tr.dataset.user = JSON.stringify(dataUser);

    tr.innerHTML =  ` <tr>
    <td>
      <img src="${dataUser.photo}" class="img-circle img-sm">
    </td>
    <td>${dataUser.name}</td>
    <td>${dataUser.email}</td>
    <td>${(dataUser.admin)? 'Sim' : 'Não'}</td>
    <td>${Ultils.dateFormat(dataUser.register)}</td>
    <td>
      <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
      <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
    </td>
  </tr>`;

  tr.querySelector(".btn-edit").addEventListener("click", e =>{
let json = JSON.parse(tr.dataset.user);

let form =  document.querySelector("#form-user-update")

for (let name in json){
                                      //replace=>troca por nada
 let field = form.querySelector("[name=" + name.replace("_", "") + "]");
                     //continue=>ignora o restante das instruçoes e avança.
 if(field){

//switch=>utiliza opçoes pré-definidas.
  switch(field.type){
  
   case'file':
  continue;
   break;

   case'radio':
       field = form.querySelector("[name=" + name.replace("_", "") + "][value="+json[name]+"]");
       field.checked= true;
   break;

   case'checkbox':
   field.checked = json[name];
   break;
    //default=> caso nenhuma expressão tenha executado.
   default:
    field.value = json[name];

  }

 }
//definir o valor                                       
}

   this.showPanelUpdate();


  })
             //como elemento, filho domelemento atual/appendch..
  this.tableEl.appendChild(tr);

  this.updateCount()

}

showPanelCreate(){

  document.querySelector("#box-user-create").style.display = "block";
  document.querySelector("#box-user-update").style.display = "none";

};

showPanelUpdate(){

  document.querySelector("#box-user-create").style.display = "none";
  document.querySelector("#box-user-update").style.display = "block";


};

updateCount(){

  let numberUsers = 0;
  let numberAdmin = 0;
//'Spread' ...=> vai pegar o array e vai distribuir certinho nas posiçoes.
  [...this.tableEl.children].forEach(tr=> {

    numberUsers++;

    let user = JSON.parse(tr.dataset.user)

    if(user._admin) numberAdmin++;

  });



  document.querySelector("#number-users").innerHTML = numberUsers;

  document.querySelector("#number-users-admin").innerHTML = numberAdmin;
  
  }

};

    

