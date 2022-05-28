

document.getElementById('login_form').addEventListener('submit',preventFormSubmitIfEmpty);

function preventFormSubmitIfEmpty(event){
    const username = document.querySelector(".username input");
    const password = document.querySelector(".password input");
    if(username.value === '' || username.value === null || password.value === '' || password.value === null){
        event.preventDefault();
        const login = document.querySelector('.errorLogin1');
        login.classList.remove("hidden");
    }
}