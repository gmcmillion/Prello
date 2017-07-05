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
    //Get users
    $.get("http://localhost:3000/users", function(response) {
        console.log(response);
    });

    //For registering new users
    $('#register-btn').on('click', function(e) {
        e.preventDefault();     //Prevent refresh
        
        //Get values
        var uname = $('#username').val();
        var pass = $('#password').val();
        var email = $('#email').val();

        //Store in db
        var post_url = "http://localhost:3000/reg"; 
        $.post(post_url, { 
            username: uname,
            password: pass,
            email: email
        }, function(data) {
            if (typeof data.redirect == 'string')
                window.location = data.redirect; 
        });
        
        //Reset form
        //$('#register-form')[0].reset();
    });
    
    //For login button
    $('#login-btn').on('click', function() {
        //Get values
        var uname = $('#user').val();
        var pass = $('#pass').val();

        //Login
        $.post("http://localhost:3000/login", {
            username: uname,
            password: pass
        }, function(data) {
            if (typeof data.redirect == 'string')
                window.location = data.redirect; 
        });

        //Reset form
        //$('#login-form')[0].reset();
    });

}

$(document).ready(main);