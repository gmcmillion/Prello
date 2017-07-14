function main() { 
    var boards = [];

    //Function that populates html boards
    function populate() {
        //Insert boards into the html
        for(var i = 0; i < boards.length; i++)
        {
            var btn = $('<button/>').attr('type', 'button').attr('class', 'firstBoard');
            btn.text(boards[i].name);
            var li = $('<li/>').append(btn);
            var a = $('<a/>').attr('href', 'list/'+boards[i]._id).append(li);
            $('.ul-boards').append(a);
        }
    }

    //Get list of boards
    $.get("boards/listofboards", function(response) {
        console.log(response);
        boards = response;  //Store response in array
        populate();         //Populate html
    });

    //Add board dropdown menu
    $('#add-new-board-btn').on('click', function() {
        $(this).next().toggle();    //Toggle dropdown menu
    });


    //Add board to user on click
    $('#board-submit-btn').on('click', function() {
        var post = $('#name').val();
        var post_url = "/boards/newboard"

        $.post(post_url, {
            name: post,
            lists: [''],
	        author: '',
            userid: ''
        }).done(function(response) {
            boards = response;
        });
    });
}

$(document).ready(main);