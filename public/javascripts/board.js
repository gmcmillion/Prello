//Global variables
var col;
var row; 
var listCards = [];

function openModal(c, r) {
    //Populate modal with relevant info
    $('#description').html(listCards[c].cards[r].description);
    $('#card-name').html(listCards[c].cards[r].name);
    $('#author').html(listCards[c].cards[r].author);

    var temp3 = $('<div/>');     //temp div to hold label colors
    for (var i = 0; i < listCards[c].cards[r].label.length; i++)
    {
        var p = $('</p>').attr('class', 'modal-label-color');
        p.css('background-color', listCards[c].cards[r].label[i]);

        temp3.append(p);     //Append p element to temp div
    }
    $('#label-colors').html(temp3); //Put temp div in the inner html of '#label-colors' 
    
    //Build Table w/ headers
    var table = $('<table/>').attr('id', 'comment-table');
    var tr1 = $('<tr/>').attr('id', 'table-header');
    var th1 = $('<th/>').text('Comment');
    var th2 = $('<th/>').text('Author');
    var th3 = $('<th/>').text('Date & Time');

    tr1.append(th1);
    tr1.append(th2);
    tr1.append(th3);

    table.append(tr1);
    //Populate modal comments
    for (var i = 0; i < listCards[c].cards[r].comment.length; i++)
    {    
        var tr2 = $('<tr/>');   
        var td1 = $('<td/>');
        var td2 = $('<td/>');
        var td3 = $('<td/>');

        //For author
        td1.append(listCards[c].cards[r].comment[i].comment);
        td2.append(listCards[c].cards[r].comment[i].commauthor);
        td3.append(listCards[c].cards[r].comment[i].commdate);

        tr2.append(td1);
        tr2.append(td2);
        tr2.append(td3);
        
        table.append(tr2);
    }
    $('#comments').html(table);

    modal.style.display = "block";      //Display modal
}

//Close modal if x is clicked or off screen
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if(event.target == modal) {
        modal.style.display = "none";
    }
}

//Show menu slider (Open & close functions)
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

//Function that makes mini color labels for cards
function colorMaker(color) {    
    var p = $('</p>').attr('class', 'mini-label-color');
    p.css('background-color', color);
    return p;
}

function populate() {
    //Insert the dummy cards into the html
    for(var i = 0; i < listCards.length; i++) 
    {    
        //Create new list contents
        var p = $('</p>').text(listCards[i].title);
        var xbtn = $('<button/>').attr('type', 'button').attr('class', 'xbtn').html('&times;');
        var newDiv = $('<div/>').attr('class', 'ListHeader');
        newDiv.append(p);
        newDiv.append(xbtn);
        
        var newUL = $('<ul/>').attr('class', 'inner-list');
        var newDiv2 = $('<div/>');
        newDiv2.append(newUL);
        
        var newDiv3 = $('<div/>').attr('class', 'outer-li');
        newDiv3.append(newDiv);
        newDiv3.append(newDiv2);
        
        var newli = $('<li/>');
        newli.append(newDiv3);
        
        $('#list').append(newli);
        
        for(var j = 0; j < listCards[i].cards.length; j++) 
        {
            //Create new p element
            var pElem = $('</p>').text(listCards[i].cards[j].description);

            //Create another p element for label colors
            var temp2 = $('<div/>').attr('class', 'lab-colors');
            for(var k = 0; k < listCards[i].cards[j].label.length; k++)
            {
                temp2.append(colorMaker(listCards[i].cards[j].label[k]));
            }

            //Create new button
            var btnElem = $('<button/>').attr('class', 'cardBtn');
            btnElem.append(pElem);
            btnElem.append(temp2);

            //Create new li
            var liElem = $('<li/>').append(btnElem);

            //Append to ul "inner-list"
            $('.inner-list:eq('+i+')').append(liElem);
        }
        
        //Add card button
        var newBtn = $('<button/>').attr('type', 'button').attr('class', 'addNewCardbtn').text('Add a card...');
        
        var newDiv4 = $('<div/>').attr('class', 'carddropdown'); 
        newDiv4.append(newBtn);  
        
        newDiv2.append(newDiv4);
    }
}

//Jquery 
function main() {  
    var socket = io.connect();

    //Get all lists which belong to this user
    var post_url = id+"/allLists";
    $.ajax({
        url: post_url,
        type: 'GET'
    }).done(function(response) {
        console.log(response);
        //Store response in array
        listCards = response;
        //Populate html
        populate();
    }); 

    //Event handler for submit btn
    $('#list-submit-btn-form').submit(function(e) {
        e.preventDefault();
        var post = $('#newListInput').val();
        var post_url = id;

        //Put added list into api
        $.post(post_url, { 
            title: post
        }).done(function(response) {  
            //Add list to data structure
            listCards[col] = response;

            //Generate html code for new list
            var p = $('</p>').text(post);
            var xbtn = $('<button/>').attr('type', 'button').attr('class', 'xbtn').html('&times;');
            var newDiv = $('<div/>').attr('class', 'ListHeader');
            newDiv.append(p);
            newDiv.append(xbtn);
            var newUL = $('<ul/>').attr('class', 'inner-list');
            var newbtn = $('<button/>').attr('type', 'button').attr('class', 'addNewCardbtn').text('Add a card...');
            var newDiv2 = $('<div/>').attr('class', 'carddropdown');
            newDiv2.append(newbtn);
            newDiv3 = $('<div/>');
            newDiv3.append(newUL);
            newDiv3.append(newDiv2);
            newDiv4 = $('<div/>').attr('class', 'outer-li');
            newDiv4.append(newDiv);
            newDiv4.append(newDiv3);    
            var liEle = $('<li/>').append(newDiv4);
            $('#list:last-child').append(liEle);    

            //Send to server
            socket.emit('send list', response);
        });
        //Hide input after submit, and reset form
        $('#add-list-dropdown').toggle();
        $('#newListInput').val('');
    });

    //Receive list back from server on client side
    socket.on('new list', function(post) {
        col = listCards.length;     //Get column
        listCards[col] = post;      //Store in global data structure

        //Generate html code for new list
        var p = $('</p>').text(post.title);
        var xbtn = $('<button/>').attr('type', 'button').attr('class', 'xbtn').html('&times;');
        var newDiv = $('<div/>').attr('class', 'ListHeader');
        newDiv.append(p);
        newDiv.append(xbtn);
        var newUL = $('<ul/>').attr('class', 'inner-list');
        var newbtn = $('<button/>').attr('type', 'button').attr('class', 'addNewCardbtn').text('Add a card...');
        var newDiv2 = $('<div/>').attr('class', 'carddropdown');
        newDiv2.append(newbtn);
        newDiv3 = $('<div/>');
        newDiv3.append(newUL);
        newDiv3.append(newDiv2);
        newDiv4 = $('<div/>').attr('class', 'outer-li');
        newDiv4.append(newDiv);
        newDiv4.append(newDiv3);    
        var liEle = $('<li/>').append(newDiv4);
        $('#list:last-child').append(liEle);   
    });

     //On click, show "Add a card" input box
    $('.addCardDropdown').hide();
    $('#list').on('click', '.addNewCardbtn' ,function() {
        //Store col & row globally
        col = $(this).parent().parent().parent().parent().index();
        row = listCards[col].cards.length;
        
        //Make popup appear under button
        $("#popup").css({
        'position': 'absolute',
            'left': $(this).offset().left,
            'top': $(this).offset().top + $(this).height() + 5
            }).show(); 
    });
    
    //When submit is click, add a new card
    $('.submit-btn').on('click', function(e) { 
        e.preventDefault();
        var post = $('.newCardInput').val();

        //Generate url w/ appropriate id
        var post_url = id+"/"+listCards[col]._id +"/card"; 

        //Put added card to url 
        $.post(post_url, 
        { 
            name: '',
            description: post,
            label: [''],
            comment: [''],
            author: ''
        })   
        .done(function(response) {
            var card = response;
            //Store locally
            listCards[col].cards[row] = card;

            //Generate html code for new list      
            var ptag = $('</p>').text(card.description);
            var tempdiv = $('<div/>').attr('class', 'lab-colors');        
            var tempBtn = $('<button/>').attr('class', 'cardBtn');
            tempBtn.append(ptag);
            tempBtn.append(tempdiv);
            var litag = $('<li/>');
            litag.append(tempBtn);
            $('.inner-list:eq('+col+')').append(litag);

            //Send to server
            socket.emit('send card', response, col, row);  
        }); 

        //Hide input after submit, and reset form
        $('.addCardDropdown').hide();
        $('.submit-btn-form')[0].reset();
    });

    //Receive card back from server on client side
    socket.on('new card', function(post, col, row) {
        //Store locally
        listCards[col].cards[row] = post;

        //Generate html code for new list and append      
        var ptag = $('</p>').text(post.description);
        var tempdiv = $('<div/>').attr('class', 'lab-colors');       
        var tempBtn = $('<button/>').attr('class', 'cardBtn');
        tempBtn.append(ptag);
        tempBtn.append(tempdiv);
        var litag = $('<li/>');
        litag.append(tempBtn);
        $('.inner-list:eq('+col+')').append(litag);
    });

    //When xbtn is clicked, delete list
    $('#list').on('click', '.xbtn', function() {
        //Get column that called this function
        col = $(this).parent().parent().parent().index();

        //Generate url w/ appropriate id
        var post_url = id+"/allLists/"+listCards[col]._id;
        
        //Delete from api
        $.ajax({
            url: post_url,
            type: "DELETE"
        });

        //Delete list from html
        $(this).parent().parent().parent().remove();
        
        //Delete list from global data structure
        listCards.splice(col, 1);

        //Send to server
        socket.emit('delete list', col);
    });

    //Receive back from server on client side and delete list
    socket.on('updated list', function(col) {
        var child = col + 1;

        //Delete list from html
        $('#list li:nth-child('+child+')').remove();
        
        //Delete list from data structure
        listCards.splice(col, 1);
    });
           
    //Function for boards drop down menu
    $('#board-btn-content').hide();
    $('#board-btn').on('click', function() {
        $(this).next().slideToggle(400);
    });
    
    //Delete-card-btn
    $('#delete-card-btn').on('click', function(){        
        //Remove from api
        var listid = listCards[col]._id;
        var cardid = listCards[col].cards[row]._id;
        
        //Generate url w/ appropriate id
        var post_url = id+"/"+listid +"/card/"+cardid; 
        
        //Delete from api
        $.ajax({
            url: post_url,
            type: "DELETE"
        });
        
        //Remove li element from ul (find the nth child)        
        $('.inner-list:eq('+col+') li:nth-child('+(row+1)+')').remove();

        //Remove this card from data structure
        listCards[col].cards.splice(row, 1);

        //Send to server
        socket.emit('delete card', col, row);

        //Close modal
        modal.style.display = "none";
    });

    //Receive back from server on client side and delete card
    socket.on('updated card', function(col, row) {
        //Remove li element from ul (find the nth child)        
        $('.inner-list:eq('+col+') li:nth-child('+(row+1)+')').remove();

        //Remove this card from data structure
        listCards[col].cards.splice(row, 1);
    });

    //Function called when label color OR comments need to be added
    function updateAPI() {
        //Generate url w/ appropriate ids
        var listid = listCards[col]._id;
        var cardid = listCards[col].cards[row]._id;
        var post_url = id+"/"+listid+"/card/"+cardid; 

		//PATCH api with new label/comment info
        $.ajax({
            url: post_url,
            type: "PATCH",
            dataType: 'json',
            data: {
                name : listCards[col].cards[row].name,
                description : listCards[col].cards[row].description,
                label : listCards[col].cards[row].label,
                comment : listCards[col].cards[row].comment,
                author : listCards[col].cards[row].author,
                _id: cardid
            }
        }).done(function(response) {
            console.log(response);
        });
    }
    
    //Function for labels dropdown menu
    $('#labeldropdown').hide();
    $('#label-btn').on('click', function() {
        $(this).next().toggle();
    });
    
    //Function for adding colors of the label to card
    $('#green').on('click', function() {        
        var p = $('</p>');
        p.css('background-color', '#5ebc60').css('width', '50px').css('height', '20px').css('border-radius', '4px');
        $('#label-colors').css('display', 'inline-block');
        
        p.append(p);
        
        var len = listCards[col].cards[row].label.length;  //Get length of label array
        listCards[col].cards[row].label[len] = '#5ebc60';    //Store in memory
        
        //Put on color on actual html card
        $('.inner-list:eq('+col+') li:nth-child('+(row+1)+') div').append(colorMaker('#5ebc60'));
        
        //Update API with new label
        updateAPI();
    
        openModal(col, row);            //re-open modal
        $('#labeldropdown').hide();
        
    });
    $('#yellow').on('click', function() {        
        var p = $('</p>');
        p.css('background-color', '#f2d44b').css('width', '50px').css('height', '20px').css('border-radius', '4px');
        $('#label-colors').append(p);
        
        var len = listCards[col].cards[row].label.length;  //Get length of label array
        listCards[col].cards[row].label[len] = '#f2d44b';   //Store in memory
    
        //Put on color on actual card
        $('.inner-list:eq('+col+') li:nth-child('+(row+1)+') div').append(colorMaker('#f2d44b'));
        
        //Update API with new label
        updateAPI();
        
        openModal(col, row);            //re-open modal
        $('#labeldropdown').hide();
    });
    $('#orange').on('click', function() {        
        var p = $('</p>');
        p.css('background-color', '#ffa95d').css('width', '50px').css('height', '20px').css('border-radius', '4px');
        $('#label-colors').append(p);
        
        var len = listCards[col].cards[row].label.length;  //Get length of label array
        listCards[col].cards[row].label[len] = '#ffa95d';   //Store in memory
        
        //Put on color on actual card
        $('.inner-list:eq('+col+') li:nth-child('+(row+1)+') div').append(colorMaker('#ffa95d'));
        
        //Update API with new label
        updateAPI();
        
        openModal(col, row);            //re-open modal
        $('#labeldropdown').hide();
    });
    $('#red').on('click', function() {        
        var p = $('</p>');
        p.css('background-color', '#ec594d').css('width', '50px').css('height', '20px').css('border-radius', '4px');
        $('#label-colors').append(p);
        
        var len = listCards[col].cards[row].label.length;  //Get length of label array
        listCards[col].cards[row].label[len] = '#ec594d';      //Store in memory
        
        //Put on color on actual card
        $('.inner-list:eq('+col+') li:nth-child('+(row+1)+') div').append(colorMaker('#ec594d'));
        
        //Update API with new label
        updateAPI();
        
        openModal(col, row);            //re-open modal
        $('#labeldropdown').hide();
    });
    $('#purple').on('click', function() {        
        var p = $('</p>');
        p.css('background-color', '#c47ad9').css('width', '50px').css('height', '20px').css('border-radius', '4px');
        $('#label-colors').append(p);
        
        var len = listCards[col].cards[row].label.length;  //Get length of label array
        listCards[col].cards[row].label[len] = '#c47ad9';   //Store in memory
        
        //Put on color on actual card
        $('.inner-list:eq('+col+') li:nth-child('+(row+1)+') div').append(colorMaker('#c47ad9'));
    
        //Update API with new label
        updateAPI();
        
        openModal(col, row);            //re-open modal
        $('#labeldropdown').hide();
    });
    $('#blue').on('click', function() {        
        var p = $('</p>');
        p.css('background-color', '#007bb9').css('width', '50px').css('height', '20px').css('border-radius', '4px');
        $('#label-colors').append(p);
        
        var len = listCards[col].cards[row].label.length;  //Get length of label array
        listCards[col].cards[row].label[len] = '#007bb9';     //Store in memory
        
        //Put on color on actual card
        $('.inner-list:eq('+col+') li:nth-child('+(row+1)+') div').append(colorMaker('#007bb9'));
    
        //Update API with new label
        updateAPI();
        
        openModal(col, row);
        $('#labeldropdown').hide();
    });
    
    //Function for 'Show Menu" slide effect
    //$('#mySidenav').hide();
    $('#show-menu-btn').on('click', function() {
        openNav();
    });
        
    //When you click on any li within the inner list, open modal
    $('#list').on('click', '.inner-list li', function() {
        
        //Get col and row
        col = $(this).parent().parent().parent().parent().index();
        row = $(this).index();
        
        //Open modal        
        openModal(col, row);
    });

    //When add comment button is clicked
    $('#add-comment-button').on('click', function() {
        var cmmt = $('#comm').val();    //Get input value
        var date = new Date();          //Generate date & time

        //Generate url w/ appropriate id
        var listid = listCards[col]._id;
        var cardid = listCards[col].cards[row]._id;
        var post_url = id+"/"+listid+"/"+cardid+"/comment";  

        //Post new comment to database
        $.post(post_url, 
        { 
            comment: cmmt,
            commauthor: '',
            commdate: date
        })   
        .done(function(response) {
            var len = listCards[col].cards[row].comment.length;  //Get length of comment array
            console.log(response);
            //Store in local memory
            listCards[col].cards[row].comment[len] = response;   

            //Update API w/ new comment info
            updateAPI();     

            openModal(col, row);            //re-open modal  
        }); 
        $('#comment-form')[0].reset();
    })
    
    //Add new list function
    $('#addNewListBtn').on('click', function() {
        $(this).next().toggle(); 
        
        //Update global col info
        col = listCards.length;
    });

    //Toggle add user input box
    $('.add-user-btn').on('click', function(e) {
        e.preventDefault();
        //Toggle input box
        $(this).next().toggle(); 
    });

    //On submit, add new user to current board
    $('#user-submit-btn').on('click', function(e) {
        e.preventDefault();                     
        var email = $('#newUserInput').val();    

        var post_url = id+"/"+email;

        //Patch board array with 
        $.ajax({
            url: post_url,
            type: "PATCH",
            dataType: 'json'
        }).done(function(response) {
            //console.log(response);
        });

        $('#add-user-div').hide();
        closeNav();
    });
}

//Will call function main when HTML & CSS are done loading
$(document).ready(main);
