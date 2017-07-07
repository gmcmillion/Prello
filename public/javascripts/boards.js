function main() { 
    var boards = [];

    //Function that populates html boards
    function populate() {
        //Insert boards into the html
        for(var i = 0; i < boards.length; i++)
        {
            //var xbtn = $('<button/>').attr('type', 'button').attr('class', 'xbtn').html('&times;');
            var btn = $('<button/>').attr('type', 'button').attr('class', 'firstBoard');
            btn.text(boards[i].name);
            //btn.append(xbtn);
            var li = $('<li/>').append(btn);
            var a = $('<a/>').attr('href', '/board').append(li);

            $('.ul-boards').append(a);
        }
    }

    //Get boards
    $.get("/boardRoutes", function(response) {
        console.log(response);
        //Store response in array
        boards = response;
        //Populate html
        populate();
    });

    //Add board dropdown menu
    $('#add-new-board-btn').on('click', function() {
        $(this).next().toggle();    //Toggle dropdown menu
    });


    //Add board to user on click
    $('#board-submit-btn').on('click', function() {
        var post = $('#name').val();

        var post_url = "/boardRoutes"

        $.post(post_url, {
            name: post,
            lists: [''],
	        author: ''
        }).done(function(response) {
            boards = response;
        });
    });

    //Delete boards w/ button click

}

$(document).ready(main);