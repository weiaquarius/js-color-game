window.onload = function() {
    init();
};

var numCards = 3;
var gameOver = false;
var colors = [];
var pickedColor;
var body = document.querySelector("body");
var cards = document.querySelectorAll('.card');
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var resetDisplay = document.querySelector("#reset span");
var easybtn = document.querySelector("#easybtn");
var hardbtn = document.querySelector("#hardbtn");
var nightbtn = document.querySelector("#nightbtn");
var hard = document.querySelector(".card.hard");
var maxtime = 5;
var count;
var timer = true;
var b_link = true;

easybtn.addEventListener("click",function(){
    if (hardbtn.className === "selected"){
        hardbtn.classList.remove("selected");
        hard.classList.remove("hard");
    }
    else{
        nightbtn.classList.remove("selected");
        hard.classList.remove("hard");
    }
    easybtn.classList.add("selected");
    numCards = 3;
    same();    
})

hardbtn.addEventListener("click",function(){
    if (easybtn.className === "selected"){
        easybtn.classList.remove("selected");
        hard.classList.add("hard");
    }
    else{
        nightbtn.classList.remove("selected");
    }
    hardbtn.classList.add("selected");
    numCards = 6;
    maxtime = 5;
    same();
})

nightbtn.addEventListener('click',night)
function night(){
    clearTimeout(count);
    if (easybtn.className === "selected"){
        easybtn.classList.remove("selected");
        hard.classList.add("hard");
    }
    else{
        hardbtn.classList.remove("selected");
        
    }
    nightbtn.classList.add("selected");
    numCards = 6;
    document.getElementById('countdown').innerHTML = " "+maxtime;
    same();
    countdown();
}

function countdown() {
    if (timer){
        if (maxtime == 0) {
            document.getElementById('countdown').innerHTML = "";
            messageDisplay.textContent = "TIMEOUT!";
            clearTimeout(count);
            gameOver = true;
            body.style.backgroundColor = pickedColor;
            changeColors("#FFF");
            resetButton.style.display = "block";
        } else {
            document.getElementById('countdown').innerHTML = " "+maxtime;
            body.style.backgroundColor = "rgb(255, 255, 255)";
            setTimeout(blink,30);
            setTimeout(blink,30);
            body.style.backgroundColor = "#rgb(255, 255, 255)";
            b_link = true;
            maxtime--;
            if (count){
                clearTimeout(count);
            }
        }  
        count = setTimeout(countdown,940); 
    }
}
function blink(){
    if (b_link){
        body.style.backgroundColor = "rgb(255, 255, 255)";
        b_link = false;
    }else{
        body.style.backgroundColor = "#232323";
    }
}

function init() {
    initCards();
    reset();
}

function initCards() {
    for (var i = 0; i < cards.length; i++) {
        //add click listeners to cards
        cards[i].addEventListener("click", function() {
            if (gameOver)
                return;
            //grab color of clicked card
            var clickedColor = this.style.backgroundColor;
            // alert(this.style.backgroundColor);
            //compare color to pickedColor
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                if (nightbtn.className === "selected"){
                    resetButton.style.display = "block";
                    clearTimeout(count);
                }
                document.getElementById('countdown').innerHTML = "";
                resetDisplay.textContent = "Play Again";
                changeColors("#FFF");
                body.style.backgroundColor = clickedColor;
                gameOver = true;
            } else {
                this.style.opacity = 0;
                messageDisplay.textContent = "Try Again";
            }
        });
    }
}

function reset() {
    gameOver = false;
    colors = generateRandomColors(numCards);
    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked Color
    colorDisplay.textContent = pickedColor;
    resetDisplay.textContent = "New Color"
    messageDisplay.textContent = "What's the Color?";
    //change colors of cards
    for (var i = 0; i < cards.length; i++) {
        cards[i].style.opacity = 1;
        if (colors[i]) {
            cards[i].style.display = "block"
            cards[i].style.backgroundColor = colors[i];
        } else {
            cards[i].style.display = "none";
        }
    }
    body.style.backgroundColor = "#232323";     
}

resetButton.addEventListener("click", function() {
    clearTimeout(count);
    reset();
    if(nightbtn.className === "selected"){
        clearTimeout(countdown);
        resetButton.style.display="none";
        maxtime = 5;
        night();
    }
})

//same reset for 3 button
function same(){
    init();
    clearTimeout(count);
    messageDisplay.textContent = "What's the Color?";
    document.getElementById('countdown').innerHTML = "";
    maxtime = 5;
    if (nightbtn.className === "selected"){
        timer = true;
        resetButton.style.display = "none";
        document.getElementById('countdown').innerHTML = " "+maxtime;
    }else{
        timer = false;
        resetButton.style.display = "block";
    }
}

function changeColors(color) {
    //loop through all cards
    for (var i = 0; i < cards.length; i++) {
        //change each color to match given color
        cards[i].style.opacity = 1;
        cards[i].style.backgroundColor = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    //make an array
    var arr = []
    //repeat num times
    for (var i = 0; i < num; i++) {
        //get random color and push into arr
        arr.push(randomColor())
    }
    //return that array
    return arr;
}

function randomColor() {
    //pick a "red" from 0 - 255
    var r = Math.floor(Math.random() * 256);
    //pick a "green" from  0 -255
    var g = Math.floor(Math.random() * 256);
    //pick a "blue" from  0 -255
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}