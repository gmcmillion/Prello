//Global variable for keeping count of add buttons
var numOfAddButtons = 2;    //initialize to 4 since we start with dummy data

//For left task bar drop down menu
function dropDownFunction() {
   document.getElementById("myDropdown").classList.toggle("show");
}

//Add card drop down menu
function addCardFunction() {
  document.getElementById("addCardDropdown").classList.toggle("add-card-show");
}

//Modal for adding cards
var modal = document.getElementById("myModal");
var btn1 = document.getElementById("myBtn1");
var btn2 = document.getElementById("myBtn2");
var span = document.getElementsByClassName("close")[0];

btn1.onclick = function() {
    modal.style.display = "block";
}

btn2.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if(event.target == modal) {
        modal.style.display = "none";
    }
}

//Show menu slider
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

//Initial Dummy cards
var card1 = {name:"Board 1", description:"This is a my 1st card!"};
var card2 = {name:"Board 2", description:"This is a my 2nd card!"};

//Array to hold cards
var arrayOfCards = [];

//Put dummy cards in Array
arrayOfCards[0] = card1;
arrayOfCards[1] = card2;

document.getElementById("testCard1").innerHTML = arrayOfCards[0].description;
document.getElementById("testCard2").innerHTML = arrayOfCards[1].description;

//Add a list to existing list
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
    li.setAttribute("id", "element"+children);
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

//Get input from 
var desc = document.querySelector('#newCardInput');
var submitbtn = document.querySelector('#submitButton');
var submitbtn_form = document.querySelector('#submit-button-form');

//Function for adding a new card
submitbtn_form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    //Toggle switch to close dropdown
    addCardFunction();
    
    //Create new card object
    var card = {name:null, description:null};
    
    //Put the input into the description
    card.description = desc.value;
    
    //Push the card onto the array
    arrayOfCards[arrayOfCards.length] = card;
    
    //Create a p tag, and insert its text
    var p = document.createElement("P");
    var tp = document.createTextNode(card.description);
    //var tp = document.createTextNode("card.description");
    p.appendChild(tp);
    
    //Create a button for the card
    var btn = document.createElement("BUTTON");
    btn.setAttribute("class", "cardBtn");
    btn.appendChild(p);
    
    //Add new li for the new card
    var ul = document.getElementById("inner-list");
    var li = document.createElement("li");
    li.appendChild(btn);
    ul.appendChild(li);
    
    //Reset the form
    submitbtn_form.reset();
});






