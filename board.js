//Initial Dummy cards
/*
var listCards = [
    {
    title: 'First List',
    cards: [
        { name: "Card 1", description: "This is my 1st card", label: ['green', 'red', 'purple']},
        { name: "Card 2", description: "This is my 2nd card", label: ['purple', 'blue']},
        { name: "Card 3", description: "This is my 3rd card", label: ['purple', 'yellow'] }
    ]
    },
    {
    title: 'Second List',
    cards: [
        { name: "Card 4", description: "This is my 4th card", label: ['red', 'blue'] },
        { name: "Card 5", description: "This is my 5th card", label: ['red', 'purple', 'green'] }
    ]
    }
];
*/




function openModal(c, r) {
    //Populate modal with relevant info
    $('#description').html(listCards[c].cards[r].description);
    $('#card-name').html(listCards[c].cards[r].name);
    
    var temp3 = $('<div/>');     //temp div to hold label colors
    for (var i = 0; i < listCards[c].cards[r].label.length; i++)
    {
        var p = $('</p>');
        if(listCards[c].cards[r].label[i] === "green") {
            p.css('background-color', '#5ebc60').css('width', '50px').css('height', '20px').css('border-radius', '4px').css('display', 'inline-block').css('margin', '5px');
        }
        if(listCards[c].cards[r].label[i] === "yellow") {
            p.css('background-color', '#f2d44b').css('width', '50px').css('height', '20px').css('border-radius', '4px').css('display', 'inline-block').css('margin', '5px');
        }
        if(listCards[c].cards[r].label[i] === "orange") {
            p.css('background-color', '#ffa95d').css('width', '50px').css('height', '20px').css('border-radius', '4px').css('display', 'inline-block').css('margin', '5px');          
        }
        if(listCards[c].cards[r].label[i] === "red") {
            p.css('background-color', '#ec594d').css('width', '50px').css('height', '20px').css('border-radius', '4px').css('display', 'inline-block').css('margin', '5px');
        }
        if(listCards[c].cards[r].label[i] === "purple") {
            p.css('background-color', '#c47ad9').css('width', '50px').css('height', '20px').css('border-radius', '4px').css('display', 'inline-block').css('margin', '5px');
        }
        if(listCards[c].cards[r].label[i] === "blue") {
            p.css('background-color', '#007bb9').css('width', '50px').css('height', '20px').css('border-radius', '4px').css('display', 'inline-block').css('margin', '5px');
        }  
        temp3.append(p);     //Append p element to temp div
    }
    $('#label-colors').html(temp3); //Put temp div in the inner html of '#label-colors' 
    
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
    var p = $('</p>');
    if(color === "green") {
        p.css('background-color', '#5ebc60').css('width', '25px').css('height', '10px').css('border-radius', '4px').css('display', 'inline-block').css('margin', '2px');
    }
    if(color === "yellow") {
        p.css('background-color', '#f2d44b').css('width', '25px').css('height', '10px').css('border-radius', '4px').css('display', 'inline-block').css('margin', '2px');
    }
    if(color === "orange") {
        p.css('background-color', '#ffa95d').css('width', '25px').css('height', '10px').css('border-radius', '4px').css('display', 'inline-block').css('margin', '2px');          
    }
    if(color === "red") {
        p.css('background-color', '#ec594d').css('width', '25px').css('height', '10px').css('border-radius', '4px').css('display', 'inline-block').css('margin', '2px');
    }
    if(color === "purple") {
        p.css('background-color', '#c47ad9').css('width', '25px').css('height', '10px').css('border-radius', '4px').css('display', 'inline-block').css('margin', '2px');
    }
    if(color === "blue") {
        p.css('background-color', '#007bb9').css('width', '25px').css('height', '10px').css('border-radius', '4px').css('display', 'inline-block').css('margin', '2px');
    }  
    return p;
}


//Global variables
var col;
var row;
var temp;           
var listCards = [];

//Ajax
$.ajax({
    url: "http://thiman.me:1337/mcnubbins/list",
    type: "GET",
    dataType : "json",
})

.done(function(json) {
    console.log(json);

    //Populate listCards[]
    for (var i = 0; i < json.length; i++)
    {
        listCards[i] = json[i];
    }
})

//Jquery 
function main() {    
    //Insert the dummy cards into the html
    for(var i = 0; i < listCards.length; i++) 
    {    
        //Create new list contents
        var p = $('</p>').text(listCards[i].title);
        var xbtn = $('<button/>').attr('type', 'button').attr('class', 'xbtn').text('x');
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
        var post_url = "http://thiman.me:1337/mcnubbins/list/"+listid+"/card/"+cardid; 
        
        //Delete from api
        $.ajax({
            url: post_url,
            type: "DELETE"
        });
                
        //Remove this card from data structure
        listCards[col].cards.splice(row, 1);
        
        //Remove li element from ul (find the nth child)        
        $('.inner-list:eq('+col+') li:nth-child('+(row+1)+')').remove();
                        
        //Close modal
        modal.style.display = "none";
    });
    
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
        
        listCards[col].cards[row].label[len] = 'green';    //Store in memory
    
        //Put on color on actual html card
        $('.inner-list:eq('+col+') li:nth-child('+(row+1)+') div').append(colorMaker('green'));

        openModal(col, row);            //re-open modal
        $('#labeldropdown').hide();
        
    });
    $('#yellow').on('click', function() {        
        var p = $('</p>');
        p.css('background-color', '#f2d44b').css('width', '50px').css('height', '20px').css('border-radius', '4px');
        $('#label-colors').append(p);
        
        var len = listCards[col].cards[row].label.length;  //Get length of label array
        listCards[col].cards[row].label[len] = 'yellow';   //Store in memory
    
        //Put on color on actual card
        $('.inner-list:eq('+col+') li:nth-child('+(row+1)+') div').append(colorMaker('yellow'));
        
        openModal(col, row);            //re-open modal
        $('#labeldropdown').hide();
    });
    $('#orange').on('click', function() {        
        var p = $('</p>');
        p.css('background-color', '#ffa95d').css('width', '50px').css('height', '20px').css('border-radius', '4px');
        $('#label-colors').append(p);
        
        var len = listCards[col].cards[row].label.length;  //Get length of label array
        listCards[col].cards[row].label[len] = 'orange';   //Store in memory
        
        //Put on color on actual card
        $('.inner-list:eq('+col+') li:nth-child('+(row+1)+') div').append(colorMaker('orange'));
        
        openModal(col, row);            //re-open modal
        $('#labeldropdown').hide();
    });
    $('#red').on('click', function() {        
        var p = $('</p>');
        p.css('background-color', '#ec594d').css('width', '50px').css('height', '20px').css('border-radius', '4px');
        $('#label-colors').append(p);
        
        var len = listCards[col].cards[row].label.length;  //Get length of label array
        listCards[col].cards[row].label[len] = 'red';      //Store in memory
        
        //Put on color on actual card
        $('.inner-list:eq('+col+') li:nth-child('+(row+1)+') div').append(colorMaker('red'));
        
        openModal(col, row);            //re-open modal
        $('#labeldropdown').hide();
    });
    $('#purple').on('click', function() {        
        var p = $('</p>');
        p.css('background-color', '#c47ad9').css('width', '50px').css('height', '20px').css('border-radius', '4px');
        $('#label-colors').append(p);
        
        var len = listCards[col].cards[row].label.length;  //Get length of label array
        listCards[col].cards[row].label[len] = 'purple';   //Store in memory
        
        //Put on color on actual card
        $('.inner-list:eq('+col+') li:nth-child('+(row+1)+') div').append(colorMaker('purple'));
    
        openModal(col, row);            //re-open modal
        $('#labeldropdown').hide();
    });
    $('#blue').on('click', function() {        
        var p = $('</p>');
        p.css('background-color', '#007bb9').css('width', '50px').css('height', '20px').css('border-radius', '4px');
        $('#label-colors').append(p);
        
        var len = listCards[col].cards[row].label.length;  //Get length of label array
        listCards[col].cards[row].label[len] = 'blue';     //Store in memory
        
        //Put on color on actual card
        $('.inner-list:eq('+col+') li:nth-child('+(row+1)+') div').append(colorMaker('blue'));
    
        //openModal(temp);            //re-open modal
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

        temp = $(this).index();
        col = $(this).parent().parent().parent().parent().index();
        row = $(this).index();
    
        //Open modal        
        openModal(col, row);
    });
    
    //On click, show "Add a card" input box
    $('.addCardDropdown').hide();
    $('#list').on('click', '.addNewCardbtn' ,function() {
        //Store col & row globally
        col = $(this).parent().parent().parent().parent().index();
        row = listCards[col].cards.length;
        
        $('.addCardDropdown').toggle();  
    });
    
    //When submit is click
    $('.submit-btn').on('click', function(e) {  
        e.preventDefault();                     //Prevent refresh    
        var post = $('.newCardInput').val();    //Get input value
        
        //Create new p tag, and assign the inputted text        
        var ptag = $('</p>').text(post);
        
        //Create another div element for label colors
        var tempdiv = $('<div/>').attr('class', 'lab-colors');

        //Create new button that will store p tag         
        var tempBtn = $('<button/>').attr('class', 'cardBtn');
        
        //Append both ptag and tempdiv to new button
        tempBtn.append(ptag);
        tempBtn.append(tempdiv);

        //Create new li tag that will store button
        var litag = $('<li/>');
        litag.append(tempBtn);
        
        //Append litag to '.inner-list'
        $('.inner-list:eq('+col+')').append(litag);
        
        //Create new card object & add new card to array 
        var card = {name:"Add Card Name...", description:$('.newCardInput').val(), label:[]};
        
        //cards[cards.length] = card;
        listCards[col].cards[row] = card;
        
        //Generate url w/ appropriate id
        var post_url = "http://thiman.me:1337/mcnubbins/list/"+listCards[col]._id +"/card/"; 

        //Put added card to url 
        $.post(post_url, 
        { 
            name: "",
            description: post,
            label: ['']
        })      
        .done(function(response) {
            //console.log(response);
            listCards[col].cards[row]._id = response._id;
            //console.log(listCards[col].cards[row]._id);
        }); 

        //Hide input after submit, and reset form
        $('.addCardDropdown').hide();
        $('.submit-btn-form')[0].reset();
    });
    
    //Add new list function
    $('#add-list-dropdown').hide();
    $('#addNewListBtn').on('click', function() {
        $(this).next().toggle(); 
        
        //Update global col info
        col = listCards.length;
    });
    
    //Create a new list on submit
    $('#list-submit-btn').on('click', function(e) {
        e.preventDefault();                     //Prevent refresh
        var post = $('#newListInput').val();    //Get input value
        
        var p = $('</p>').text(post);
        
        var xbtn = $('<button/>').attr('type', 'button').attr('class', 'xbtn').text('x');
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
        
        //Store the clone in new li, which is the last child
        $('#list:last-child').append(liEle);
        
        //Add list to data structure
        var newList = {title: post, cards:[]};
        listCards[col] = newList;
        
        //Hide input after submit, and reset form
        $('#add-list-dropdown').hide();
        $('#list-submit-btn-form')[0].reset();
    });

    //When xbtn is clicked, delete list
    $('#list').on('click', '.xbtn', function() {
        //Get column that called this function
        col = $(this).parent().parent().parent().index();

        //Delete list from html
        $(this).parent().parent().parent().remove();
        
        //Delete list from data structure
        listCards.splice(col, 1);
    });
}

//Will call function main when HTML & CSS are done loading
$(document).ready(main);
