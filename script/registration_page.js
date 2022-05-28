let errors = [];
for(let i=0;i<5;i++){
    errors[i] = 1;
}
document.querySelector(".email input").addEventListener('blur',checkEmail);
document.querySelector(".name input").addEventListener('blur',checkName);
document.querySelector(".surname input").addEventListener('blur',checkSurname);
const password = document.querySelector(".password input");
password.addEventListener('blur',checkPassword);
document.querySelector(".confirmpassword input").addEventListener('blur',checkConfirmPassword);
document.querySelector(".username input").addEventListener('blur',checkUsername);
document.getElementById("registration_form").addEventListener("submit",checkFields);

function jsonCheckEmail(json){
    console.log(json);
    const email = document.querySelector('.email');
    const input = email.querySelector("input");
    const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(json.exists === true){
        if(input.classList.contains("inputError")){
            const span = email.querySelector("span");
            span.textContent = "Email già esistente";
            errors[2] = 1;
            return;
        }
        const errorMessage = document.createElement("span");
        errorMessage.classList.add("errormessage");
        errorMessage.textContent = 'E-Mail già esistente.';
        email.appendChild(errorMessage);
        email.querySelector("input").classList.add("inputError");
        errors[2] = 1;
         
        
    }
    else if(!res.test(input.value)){
            if(input.classList.contains("inputError")){
                const span = email.querySelector("span");
                span.remove();
                const errorMessage = document.createElement("span");
                errorMessage.classList.add("errormessage");
                errorMessage.textContent = 'E-Mail non valida.';
                email.appendChild(errorMessage);
                email.querySelector("input").classList.add("inputError");
                errors[2] = 1;
                return;
            }
            const errorMessage = document.createElement("span");
            errorMessage.classList.add("errormessage");
            errorMessage.textContent = 'E-Mail non valida.';
            email.appendChild(errorMessage);
            input.classList.add("inputError");
            errors[2] = 1;
        }
    else{
        errors[2] = 0;
        const span = email.querySelector(".errormessage");
        if(span!=null){
            span.remove();
            input.classList.remove("inputError");
        }
    }  
    console.log(errors);
}


function checkEmail(event){
    fetch("check_email.php?q="+encodeURIComponent(event.currentTarget.value)).then(fetchResponse).then(jsonCheckEmail);
}

function checkName(event){
    const res = /[A-Za-z]/;
    if(!res.test(event.currentTarget.value)){
        if(event.currentTarget.classList.contains("inputError")){
            return;
        }
        const errorMessage = document.createElement("span");
        errorMessage.classList.add("errormessage");
        errorMessage.textContent = 'Nome non valido. (Numeri o simboli non ammessi)';
        event.currentTarget.parentNode.parentNode.appendChild(errorMessage);
        event.currentTarget.classList.add("inputError");
         ;
         
        errors[0] = 1;
        
    
    }
    else{
        const span = event.currentTarget.parentNode.parentNode.querySelector(".errormessage");
        if(span!=null){
            span.remove();
        }
        event.currentTarget.classList.remove("inputError");
        errors[0] = 0;
    }
    console.log(errors);

}

function checkSurname(event){
    const res = /[A-Za-z]/;
    if(!res.test(event.currentTarget.value)){
        if(event.currentTarget.classList.contains("inputError")){
            return;
        }
        const errorMessage = document.createElement("span");
        errorMessage.classList.add("errormessage");
        errorMessage.textContent = 'Cognome non valido. (Numeri o simboli non ammessi)';
        event.currentTarget.parentNode.parentNode.appendChild(errorMessage);
        event.currentTarget.classList.add("inputError");
        errors[1] = 1;
         
        
    
    }
    else{
        const span = event.currentTarget.parentNode.parentNode.querySelector(".errormessage");
        if(span!=null){
            span.remove();
        }
        event.currentTarget.classList.remove("inputError");
        errors[1] = 0;
    }
    console.log(errors);

}

function checkPassword(event){
    var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;
    if(String(event.currentTarget.value).length > 20 || String(event.currentTarget.value).length < 8  || !(event.currentTarget.value).match(decimal)){
        if(event.currentTarget.classList.contains("inputError")){
            return;
        }
        const errorMessage = document.createElement("span");
        errorMessage.classList.add("errormessage");
        errorMessage.textContent = 'La password deve essere compresa tra gli 8 e i 20 caratteri e avere almeno una lettera maiuscola, una minuscola e un carattere speciale.';
        event.currentTarget.parentNode.parentNode.appendChild(errorMessage);
        event.currentTarget.classList.add("inputError");
        errors[4] = 1;
         
    
    }
    else{
        
        const span = event.currentTarget.parentNode.parentNode.querySelector(".errormessage");
        if(span!=null){
            span.remove();
        }
        event.currentTarget.classList.remove("inputError");
        errors[4] = 0;
    }
    console.log(errors);

}


function checkConfirmPassword(event){
    const res = /^[A-Za-z-]/;
    if(String(event.currentTarget.value) != password.value){
        if(event.currentTarget.classList.contains("inputError")){
            return;
        }
        const errorMessage = document.createElement("span");
        console.log(password.value);
        errorMessage.classList.add("errormessage");
        errorMessage.textContent = 'Le password non corrispondono.';
        event.currentTarget.parentNode.parentNode.appendChild(errorMessage);
        event.currentTarget.classList.add("inputError");
        errors[5] = 1;
         
        
    
    }
    else{
        
        const span = event.currentTarget.parentNode.parentNode.querySelector(".errormessage");
        console.log(span);
        if(span!=null){
            span.remove();
        }
        event.currentTarget.classList.remove("inputError");
        errors[5] = 0;
    }
    console.log(errors);

}

function jsonCheckUsername(json){
    const username = document.querySelector('.username');
    const input = username.querySelector("input");
    if(json.exists === true){
        if(input.classList.contains("inputError")){
            const span = username.querySelector("span");
            span.textContent = "Nome utente già esistente";
            errors[3] = 1;
            return;
        }
        const errorMessage = document.createElement("span");
        errorMessage.classList.add("errormessage");
        errorMessage.textContent = 'Nome utente già esistente.';
        username.appendChild(errorMessage);
        username.querySelector("input").classList.add("inputError");
        errors[3] = 1;
         
        
    }
    else if(input.value.length > 15){
            if(input.classList.contains("inputError")){
                const span = username.querySelector("span");
                span.remove();
                const errorMessage = document.createElement("span");
                errorMessage.classList.add("errormessage");
                errorMessage.textContent = 'Il nome utente non può essere più lungo di 15 caratteri.';
                username.appendChild(errorMessage);
                username.querySelector("input").classList.add("inputError");
                errors[3] = 1;
                return;
            }
            const errorMessage = document.createElement("span");
            errorMessage.classList.add("errormessage");
            errorMessage.textContent = 'Il nome utente non può essere più lungo di 15 caratteri';
            username.appendChild(errorMessage);
            input.classList.add("inputError");
            errors[3] = 1;
        }
    else{
        errors[3] = 0;
        const span = username.querySelector(".errormessage");
        if(span!=null){
            span.remove();
            input.classList.remove("inputError");
        }
    }    
    console.log(errors);

}

function fetchResponse(response){
    return response.json();
}

function checkUsername(event){
        fetch("check_username.php?q="+encodeURIComponent(event.currentTarget.value)).then(fetchResponse).then(jsonCheckUsername);
}





function checkFields(event){
    let sum = errors.reduce(function (a,b){
        return a + b;
    },0);
    const errorRegistering = document.querySelector(".errorRegistration");
    console.log(sum);
    if(sum == 0){
        return;
    }
    event.preventDefault();
    errorRegistering.classList.remove("hidden");
    errorRegistering.textContent = "Compila correttamente i campi.";
    
    
}

