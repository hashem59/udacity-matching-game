/*
jshint esversion: 6 
*/
/* *****  Code Map *****   */
//1- shufle Methode
//-2 Creat cards function
//-3 check if mathed when clicked function
//-4 Start Timer when first card clicked
//-5 stop timer function when all matched
//-6 make cards disapear again when not matched
//- 7 increase moves number function
//- check if all cards mathed 
//- restart game when reastart button clicked
/*
 * Create a list that holds all of your cards
 */
let cardItems = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"];

const cards = document.getElementsByClassName("card");
let openCrds = [];
let moves = 0;
let starRating = 3;
let mactchedCrds = 0;
const deck = document.getElementById("deck");
const movesSpan = document.getElementById("moves");
const stars = document.getElementsByClassName("fa-star");
const winDetails = document.getElementById("win-details");
const popup = document.getElementById("popup");
const playAgain = document.getElementById("play-again");
const restartPtn = document.getElementById("restart");
let clicked = false;
let sec = 0;
let min = 0;
let clock;
const timerSec = document.getElementById("timer-sec");
const timerMin = document.getElementById("timer-min");

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
	
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the "shuffle" method
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function createCardItems() {
    let cardList = shuffle(cardItems);
    cardList.forEach(function(cardItem) {
        deck.innerHTML += ("<li><i class='card fa " + cardItem + "'></i></li>");
    });
}

shuffle(cardItems);
createCardItems();

// check if clicked cards are matched
for (let x in cards) {
    cards[x].addEventListener("click", function() {
        startClock();
        this.classList.toggle("open");
        this.classList.toggle("show");
        this.classList.add("flipInY");
        // prevent being clicked again in next 1100ms not to be matched 
        this.style.pointerEvents = "none";
        openCrds.push(cards[x]);
        //console.log(openCrds);
        if (openCrds.length === 2) {
            if (openCrds[0].classList[2] === openCrds[1].classList[2]) {
                openCrds[0].classList.add("match", "rubberBand");
                openCrds[1].classList.add("match", "rubberBand");
                mactchedCrds += 1;
                moves++;
                removeOpenCards();
                //findWinner();
                setTimeout(findWinner, 1000);
            } else {
                // If classes don't match, add "wrong" class
                openCrds[0].classList.add("shake", "wrong");
                openCrds[1].classList.add("shake", "wrong");
                openCrds[0].style.pointerEvents = "auto";
                openCrds[1].style.pointerEvents = "auto";
                // Set timeout to remove "show" and "open" class and make it clickale again
                //and run removeOpenCards
                setTimeout(removeClasses, 1100);
                moves++;
            }
        }
	setTimeout(cardsClickable, 1100);
        increaseMoves();
        restartGame();
    });
}

//maks cards clickable again after checking matching
function cardsClickable() {
	for ( let j = 0; j < cards.length; j++) {
		if (!(cards[j].classList.contains("match")) &&
			!(cards[j].classList.contains("open"))
		   ) {
			cards[j].style.pointerEvents = "auto";
		}
	}
}


/* 
Setup Timer
*/
function startClock() {
    if (clicked === false) {
        clock = setInterval(addSec, 1000);
        clicked = true;
    } else if (clicked === true) {}
}

function addSec() {
    if (sec == 59) {
        sec = 0;
        timerSec.innerHTML = "0" + sec;
        min++;
        if (min < 10) {
            timerMin.innerHTML = "0" + min;
        } else {
            timerMin.innerHTML = min;
        }
        sec = 0;
    } else {
        sec++;
        if (sec < 10) {
            timerSec.innerHTML = "0" + sec;
        } else {
            timerSec.innerHTML = sec;
        }
    }
}

function stopClock() {
    if (min < 10) {
        timerMin.innerHTML = "0" + min;
    } else {
        timerMin.innerHTML = min;
    }
    if (sec < 10) {
        timerSec.innerHTML = "0" + sec;
    } else {
        timerSec.innerHTML = sec;
    }

    window.clearInterval(clock);
}

// Reset openCrds.length to 0
function removeOpenCards() {
    openCrds = [];
}

// Remove all classes except "match"
function removeClasses() {
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.remove("shake", "wrong", "open", "show", "flipInY");
        removeOpenCards();
    }
}

//update movments nub. while playing
function increaseMoves() {

    console.log(moves);
    movesSpan.textContent = moves;
    if (moves >= 20 && moves <= 23) {
        stars[2].style.color = "#aaa"
        starRating = "2";
    } else if (moves > 23) {
        stars[1].style.color = "#aaa";
        starRating = "1";
    }
}

// Open popup when all cards matched
function findWinner() {
	
    if (mactchedCrds == 8) {

        winDetails.innerHTML = "With " + moves + " Moves and With Star Rating&colon; " + starRating + " Star" + "<br>" + "With Time of " + min + "&colon;" + sec + "<br>" + "Wooooooooooow!";

        popup.style.visibility = "visible";
        popup.classList.add = "fadeIn";

        stopClock();

        playAgain.addEventListener("click", function() {
            location.reload();
        });

        //clearInterval(timer);

    }
}

function restartGame() {
    restartPtn.addEventListener("click", function() {
        location.reload();
    });
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
