var password = document.querySelector('#password');
var password_confirm = document.querySelector('#password-confirm');
var register_btn = document.querySelector('#register-btn');
var register_form = document.querySelector('#register-form');

//Password match verifier
register_form.addEventListener('submit', function(e) {
    if(password.value !== password_confirm.value) {
        e.preventDefault();
        alert('Passwords are not the same!!');
    }
});

function main() {    
    //Get users page
    $.get("http://localhost:3000/users", function(response) {
    });
}

$(document).ready(main);