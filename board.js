//Global variable for keeping count of add buttons
var numOfAddButtons = 2;    //initialize to 4 since we start with dummy data

//Drop down menu for labels (DONE)
function addLabel() {
    document.getElementById("labelDropdown").classList.toggle("labelshow");
}









//Add a LIST to existing list
var lastid = 1;
addAnother = function() {
    //Create a add button and set attributes
    var btn = document.createElement("BUTTON");
    var t = document.createTextNode("Add a card...");
    btn.appendChild(t);
    btn.setAttribute("class", "addNewCardbtn");
    numOfAddButtons = numOfAddButtons + 1;  //increase count of buttons
    btn.setAttribute("id", "myBtn"+numOfAddButtons);

    //Create the delete button and set the attributes
    var btn2 = document.createElement("BUTTON");
    var t2 = document.createTextNode("x");
    btn2.appendChild(t2);  
    btn2.setAttribute("onclick", "deleteList("+"item"+lastid+")");
    btn2.setAttribute("type", "button");
    btn2.setAttribute("class", "ListHeader-btn");
    btn2.setAttribute("id", "item"+lastid);
    
    //Create a new list and assign button to it
    var ul = document.getElementById("list");
    var li = document.createElement("li");
    var children = ul.children.length;
    //li.setAttribute("id", "element"+children);
    li.appendChild(btn2);
    li.appendChild(btn);
    ul.appendChild(li);
    
    //increment lastid
    lastid+=1;
}

//Delete list
var list = document.getElementById("list");

/*
deleteList() = function(itemid) {
    var listItem = document.getElementById(itemid);
    list.removeChild(listItem);
}
*/




//Initial Dummy cards
var card1 = {name:"Card 1", description:"This is a my 1st card!"};
var card2 = {name:"Card 2", description:"This is a my 2nd card!"};

//Array to hold cards
var arrayOfCards = [];

//Put dummy cards in Array
arrayOfCards[0] = card1;
arrayOfCards[1] = card2;

//Insert the dummy cards into the html
document.getElementById("testCard1").innerHTML = arrayOfCards[0].description;
document.getElementById("testCard2").innerHTML = arrayOfCards[1].description;






//Function that opens modal
function openModal(num) {
        
    //Populate modal with relevant info
    document.getElementById("description").innerHTML = arrayOfCards[num].description;
    
    //Display modal
    modal.style.display = "block";
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

//Jquery
var lol;
function main() {
    
    //Function for boards drop down menu
    $('#board-btn-content').hide();
    $('#board-btn').on('click', function() {
        $(this).next().slideToggle(400);
    });

    //Function for 'Show Menu" slide effect
    //$('#mySidenav').hide();
    $('#show-menu-btn').on('click', function() {
        openNav();
    });
        
    //When you click on any li within the inner list, do something
    $('#list').on('click', '.inner-list li', function() {
        //Get the index of the list that was clicked
        var temp = $(this).index();
        //Open modal
        openModal(temp);
    });

    //On click, show "Add a card" input box
    $('#addCardDropdown').hide();
    $('.addNewCardbtn').on('click', function() {
        $(this).next().toggle();
    });
    
    //When submit is click
    $('#submitButton').on('click', function(e) {  
        e.preventDefault();                     //Prevent refresh    
        var post = $('#newCardInput').val();    //Get input value
        
        //Create new li element
        //$('<li>').text(post).appendTo('.inner-list');
        
        //Create new p tag
        var ptag = document.createElement("p");
        ptag.innerHTML = post;
        ptag.setAttribute

        //Create new button that will store p tag 
        var tempBtn = document.createElement("button");
        tempBtn.setAttribute("class", "cardBtn");
        tempBtn.append(ptag);

        //Create new li tag that will store button
        var litag = document.createElement("li");
        litag.append(tempBtn);
        
        //Append litag to '.inner-list'
        $('.inner-list').append(litag);
        
        //Create new card object & add new card to array
        var card = {name:null, description:$('#newCardInput').val()};
        arrayOfCards[arrayOfCards.length] = card;
        
        //Hide input after submit, and reset form
        $('#addCardDropdown').hide();
        $('#submit-button-form')[0].reset();
    });
}

//Will call function main when HTML & CSS are done loading
$(document).ready(main);


