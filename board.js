//Initial Dummy cards
var listCards = [
    {
    title: 'First List',
    arrayOfCards: [
        { id: '01', name: "Card 1", description: "This is a my 1st card!", label: ['green', 'red', 'purple']},
        { id: '02', name: "Card 2", description: "This is a my 2nd card!", label: ['purple', 'blue']},
        { id: '03', name: "Card 3", description: "This is a my 3rd card!", label: ['purple'] }
    ]
    },
    {
    title: 'Second List',
    arrayOfCards: [
        { id: '10', name: "Card 4", description: "This is a my 4th card!", label: ['red', 'blue'] },
        { id: '11', name: "Card 5", description: "This is a my 5th card!", label: ['red', 'purple', 'green'] }
    ]
    }/*,
    {
    title: 'Third List',
    arrayOfCards: [
        { id: '10', name: "Card 6", description: "This is a my 6th card!", label: ['red', 'blue'] },
        { id: '11', name: "Card 7", description: "This is a my 7th card!", label: ['red', 'purple', 'green'] }
    ]
    }*/
];


function openModal(c, r) {
    //Populate modal with relevant info
    $('#description').html(listCards[c].arrayOfCards[r].description);
    $('#card-name').html(listCards[c].arrayOfCards[r].name);
    
    var temp3 = $('<div/>');     //temp div to hold label colors
    for (var i = 0; i < listCards[c].arrayOfCards[r].label.length; i++)
    {
        var p = $('</p>');
        if(listCards[c].arrayOfCards[r].label[i] === "green") {
            p.css('background-color', '#5ebc60').css('width', '50px').css('height', '20px').css('border-radius', '4px').css('display', 'inline-block').css('margin', '5px');
        }
        if(listCards[c].arrayOfCards[r].label[i] === "yellow") {
            p.css('background-color', '#f2d44b').css('width', '50px').css('height', '20px').css('border-radius', '4px').css('display', 'inline-block').css('margin', '5px');
        }
        if(listCards[c].arrayOfCards[r].label[i] === "orange") {
            p.css('background-color', '#ffa95d').css('width', '50px').css('height', '20px').css('border-radius', '4px').css('display', 'inline-block').css('margin', '5px');          
        }
        if(listCards[c].arrayOfCards[r].label[i] === "red") {
            p.css('background-color', '#ec594d').css('width', '50px').css('height', '20px').css('border-radius', '4px').css('display', 'inline-block').css('margin', '5px');
        }
        if(listCards[c].arrayOfCards[r].label[i] === "purple") {
            p.css('background-color', '#c47ad9').css('width', '50px').css('height', '20px').css('border-radius', '4px').css('display', 'inline-block').css('margin', '5px');
        }
        if(listCards[c].arrayOfCards[r].label[i] === "blue") {
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

//Jquery 
function main() {
    //Insert the dummy cards into the html
    for(var i = 0; i < listCards.length; i++) 
    {    
        //Create new list contents
        var p = $('</p>').text(listCards[i].title);
        var newDiv = $('<div/>').attr('class', 'ListHeader');
        newDiv.append(p);
        
        var newUL = $('<ul/>').attr('class', 'inner-list');
        var newDiv2 = $('<div/>');
        newDiv2.append(newUL);
        
        var newDiv3 = $('<div/>').attr('class', 'outer-li');
        newDiv3.append(newDiv);
        newDiv3.append(newDiv2);
        
        var newli = $('<li/>');
        newli.append(newDiv3);
        
        $('#list').append(newli);
        
        for(var j = 0; j < listCards[i].arrayOfCards.length; j++) 
        {
            //Create new p element
            var pElem = $('</p>').text(listCards[i].arrayOfCards[j].description);

            //Create another p element for label colors
            var temp2 = $('<div/>').attr('class', 'lab-colors').attr('id', i+""+j);
            for(var k = 0; k < listCards[i].arrayOfCards[j].label.length; k++)
            {
                temp2.append(colorMaker(listCards[i].arrayOfCards[j].label[k]));
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
        //Remove this card from data structure
        listCards[col].arrayOfCards.splice(row, 1);
        
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
        
        var len = listCards[col].arrayOfCards[row].label.length;  //Get length of label array
        listCards[col].arrayOfCards[row].label[len] = 'green';    //Store in memory
    
        //Put on color on actual card
        $('#'+col+""+row).append(colorMaker('green'));

        openModal(col, row);            //re-open modal
        $('#labeldropdown').hide();
        
    });
    $('#yellow').on('click', function() {        
        var p = $('</p>');
        p.css('background-color', '#f2d44b').css('width', '50px').css('height', '20px').css('border-radius', '4px');
        $('#label-colors').append(p);
        
        var len = listCards[col].arrayOfCards[row].label.length;  //Get length of label array
        listCards[col].arrayOfCards[row].label[len] = 'yellow';   //Store in memory
    
        //Put on color on actual card
        $('#'+col+""+row).append(colorMaker('yellow'));
        
        openModal(col, row);            //re-open modal
        $('#labeldropdown').hide();
    });
    $('#orange').on('click', function() {        
        var p = $('</p>');
        p.css('background-color', '#ffa95d').css('width', '50px').css('height', '20px').css('border-radius', '4px');
        $('#label-colors').append(p);
        
        var len = listCards[col].arrayOfCards[row].label.length;  //Get length of label array
        listCards[col].arrayOfCards[row].label[len] = 'orange';   //Store in memory
        
        //Put on color on actual card
        $('#'+col+""+row).append(colorMaker('orange'));
        
        openModal(col, row);            //re-open modal
        $('#labeldropdown').hide();
    });
    $('#red').on('click', function() {        
        var p = $('</p>');
        p.css('background-color', '#ec594d').css('width', '50px').css('height', '20px').css('border-radius', '4px');
        $('#label-colors').append(p);
        
        var len = listCards[col].arrayOfCards[row].label.length;  //Get length of label array
        listCards[col].arrayOfCards[row].label[len] = 'red';      //Store in memory
        
        //Put on color on actual card
        $('#'+col+""+row).append(colorMaker('red'));
        
        openModal(col, row);            //re-open modal
        $('#labeldropdown').hide();
    });
    $('#purple').on('click', function() {        
        var p = $('</p>');
        p.css('background-color', '#c47ad9').css('width', '50px').css('height', '20px').css('border-radius', '4px');
        $('#label-colors').append(p);
        
        var len = listCards[col].arrayOfCards[row].label.length;  //Get length of label array
        listCards[col].arrayOfCards[row].label[len] = 'purple';   //Store in memory
        
        //Put on color on actual card
        $('#'+col+""+row).append(colorMaker('purple'));
    
        openModal(col, row);            //re-open modal
        $('#labeldropdown').hide();
    });
    $('#blue').on('click', function() {        
        var p = $('</p>');
        p.css('background-color', '#007bb9').css('width', '50px').css('height', '20px').css('border-radius', '4px');
        $('#label-colors').append(p);
        
        var len = listCards[col].arrayOfCards[row].label.length;  //Get length of label array
        listCards[col].arrayOfCards[row].label[len] = 'blue';     //Store in memory
        
        //Put on color on actual card
        $('#'+col+""+row).append(colorMaker('blue'));
    
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
        //Get the index of the list that was clicked
        temp = $(this).index();
        //col = $(this).parent().index();
        col = $(this).parent().parent().parent().parent().index();
        row = $(this).index();
    
        //Open modal        
        openModal(col, row);
    });
    
    //On click, show "Add a card" input box
    $('.addCardDropdown').hide();
    $('.addNewCardbtn').on('click', function() {
        //Store col & row globally
        col = $(this).parent().parent().parent().parent().index();
        row = listCards[col].arrayOfCards.length;
        
        //alert('col: ' + col + ' row: ' + row + ' temp: ' + temp);
        
        $('.addCardDropdown').toggle();  
    });
    
    //When submit is click
    $('.submit-btn').on('click', function(e) {  
        e.preventDefault();                     //Prevent refresh    
        var post = $('.newCardInput').val();    //Get input value
        
        //Create new p tag, and assign the inputted text        
        var ptag = $('</p>').text(post);
        
        //Create another div element for label colors
        var tempdiv = $('<div/>').attr('class', 'lab-colors').attr('id', col+""+row);

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
        
        //Create new card object & add new card to array ***************** check if correct for 2d array
        var card = {name:"Add Card Name...", description:$('.newCardInput').val(), label:[]};
        
        //arrayOfCards[arrayOfCards.length] = card;
        listCards[col].arrayOfCards[row] = card;
        
        //Hide input after submit, and reset form
        $('.addCardDropdown').hide();
        $('.submit-btn-form')[0].reset();
    });
    
    //Add new list function
    $('#add-list-dropdown').hide();
    $('#addNewListBtn').on('click', function() {
        $(this).next().toggle();  
    });
    
    $('#list-submit-btn').on('click', function(e) {
        e.preventDefault();                     //Prevent refresh
        var post = $('#newListInput').val();    //Get input value
        
        var p = $('</p>').text(post);
        
        var btn = $('<button/>').attr('type', 'button').attr('class', 'ListHeader-btn').text('x');
        var newDiv = $('<div/>').attr('class', 'ListHeader');
        
        newDiv.append(p);
        newDiv.append(btn);
        
        var newUL = $('<ul/>').attr('class', 'inner-list');
        
        //Create a clone of the div containing list contents
        //var $dup = $('.outer-li:last-child').clone();
        var $dup = $('.carddropdown').clone();
        
        //For card 
        
        
        
        
        newDiv2 = $('<div/>');
        newDiv2.append(newUL);
        newDiv2.append($dup);
        
        newDiv3 = $('<div/>').attr('class', 'outer-li');
        newDiv3.append(newDiv);
        newDiv3.append(newDiv2);
        
        //Create a new child li
        //$('<li>').appendTo('#list');
        
        
        var liEle = $('<li/>').append(newDiv3);
        
        //Store the clone in new li, which is the last child
        $('#list:last-child').append(liEle);
        
        
        
        //Add list to data structure
        
        
        //Hide input after submit, and reset form
        $('#add-list-dropdown').hide();
        $('#list-submit-btn-form')[0].reset();
    });
}

//Will call function main when HTML & CSS are done loading
$(document).ready(main);

/*
for(var i = 0; i < arrayOfCards.length; i++)
{
    //Create new p element
    var pElem = $('</p>').text(arrayOfCards[i].description);

    //Create another p element for label colors
    var temp2 = $('<div/>').attr('class', 'lab-colors').attr('id', '0'+i);
    for(var j = 0; j < arrayOfCards[i].label.length; j++)
    {
        temp2.append(colorMaker(arrayOfCards[i].label[j]));
    }

    //Create new button
    var btnElem = $('<button/>').attr('class', 'cardBtn');
    btnElem.append(pElem);
    btnElem.append(temp2);

    //Create new li
    var liElem = $('<li/>').append(btnElem);

    //Append to ul "inner-list"
    $('.inner-list').append(liElem);
}
*/