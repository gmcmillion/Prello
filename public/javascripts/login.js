function main() {    
    //Confirm registration passwords are the same
    $('#register-btn').on('click', function(e) {
        var password = $('#password').val();
        var password_confirm = $('#password-confirm').val();
        
        if(password !== password_confirm) {
            e.preventDefault();
            alert('Passwords are not the same, try again!!');
        }
    });
}

$(document).ready(main);