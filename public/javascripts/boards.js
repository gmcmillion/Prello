function main() {  
    //Log out button
    $('#logout-btn').on('click', function() {
        console.log('logging out');

        //log out
        var post_url = "http://localhost:3000/logout"; 
        $.get(post_url, function(data) {
            if (typeof data.redirect == 'string')
                window.location = data.redirect; 
        });
    });

    $('#firstBoard').on('click', function() {
        //Go to board
        var post_url = "http://localhost:3000/board"; 
        $.get(post_url, function(data) {
            console.log(data);
            if (typeof data.redirect == 'string') {
                window.location = data.redirect; 
            }
        });
    });
}

$(document).ready(main);