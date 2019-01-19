const diamond = { id: 1, style:"fa fa-diamond" };
const paperPlane = { id: 2, style:"fa fa-paper-plane-o" };
const anchor = { id: 3, style: "fa fa-anchor" };
const bolt = { id: 4, style: "fa fa-bolt" };
const cube = { id: 5, style: "fa fa-cube" };
const leaf = { id: 6, style: "fa fa-leaf" };
const bicycle = { id: 7, style: "fa fa-bicycle" };
const bomb = { id: 8, style: "fa fa-bomb" };

let turnedCard;
let resetFlag = false;
let matchesFound = 0;
let moveCounter = 0;
let startTime;
let timer;
let gameComplete = false;


generatePack();



/*
to do:

stars should change according to number of moves
complete needs to show the final card
complete needs a better pop up
event handles on container instead of individual cards
*/

/*
 * Create a list that holds all of your cards
 */

 function generatePack() {
    let pack = [diamond, diamond, paperPlane, paperPlane, anchor, anchor, bolt, bolt, cube, cube, leaf, leaf, bicycle, bicycle, bomb, bomb]

    turnedCard = null;
    matchesFound = 0;
    moveCounter = 0;
    resetTimer();

    displayScore();
    displayPack(pack);
    addCardClickListener();
    addResetListener();
 }

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function displayPack(pack) {
    let shuffledPack = shuffle(pack);

    const newPack = document.createElement("ul");
    newPack.className = "deck";
    newPack.id = "deck";

    for (let i = 0; i < shuffledPack.length; i++) {
        const newCard = document.createElement("li");
        newCard.className = "card";

        const newI = document.createElement("i");
        newI.className = shuffledPack[i].style;
        newCard.appendChild(newI);

        newPack.appendChild(newCard);
    }

    const deck = document.getElementById('deck');
    // console.log('removing deck...');
    // console.log(deck);
    deck.remove();

    const container = document.getElementById('container');
    container.appendChild(newPack);

    // console.log(newPack);
}

function displayScore()
{
    // const score = document.getElementsByClassName("score-panel");

    const moves = document.querySelector('.moves');
    moves.innerHTML = moveCounter;
}

function displayTimer() {
    const timer = document.querySelector('.timer');
    timer.innerHTML =  Math.round((performance.now() - startTime) / 1000);
}

function resetTimer() {
    const showTimer = document.querySelector('.timer');
    showTimer.innerHTML =  0;

    clearInterval(timer);
}

function removeStar() {
    // const starLi = document.createElement("li");
    // const starI = document.createElement("i");
    // starI.className = "fa highlighted-star";
    // starLi.appendChild(starI);

    const stars = document.getElementsByClassName('fa fa-star');
    // stars[0].remove();
    stars[0].className = ".hiddenStar";

    
    // const starsContainer = document.getElementsByClassName('stars');
    // starsContainer.appendChild(starLi);

    // stars.remove();

    // stars.appendChild(starLi);

    // const star = stars.getElementsByClassName("fa fa-star");


    // const container = document.getElementById('container');
    // container.appendChild(newPack);
}

function resetStars() {
    const stars = document.getElementsByClassName('.hiddenStar');
    for (let i = 0; i < stars.length; i++) {
        stars[i].className = "fa fa-star";
    }
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 function addCardClickListener() {
    const allCards = document.querySelectorAll('.card');

    for(let i = 0; i < allCards.length; i++){
        allCards[i].addEventListener('click', function () { 
            displayCard(allCards[i]);
        });
    }
 }

 function addResetListener() {
    const restart = document.querySelector('.restart');

    restart.addEventListener('click', function () { 
        resetStars();
        resetStars();

        const complete = document.getElementById('complete');
        complete.className = "hideCongratulations";
        generatePack();
    });
 }


 function displayCard(card) {
    if (moveCounter == 0) {
        startTime = performance.now();
        timer = setInterval(displayTimer, 1000);
    }


    if (card.className != "card open show" && card.className != "card match" && resetFlag == false) {

        ++moveCounter;

        if (moveCounter == 20 || moveCounter == 30 || moveCounter == 40) {
            removeStar();
        }

        displayScore();

        card.className = "card open show";
        if (turnedCard == null) { 
            turnedCard = card;
        }
        else {
            const checkCard1 = card.querySelector("i");
            const checkCard2 = turnedCard.querySelector("i");

            if (checkCard1.className == checkCard2.className) {
                foundMatch(card, turnedCard);
            }
            else {
                resetFlag = true;
                resetCards(card, turnedCard);
            }
        }

    }

    function foundMatch(card1, card2) {
        card1.className = "card match";
        card2.className = "card match";
        turnedCard = null;
        
        if (++matchesFound == 8) {
            gameComplete();
        }
    }

    function resetCards(card1, card2)
    {
        setTimeout(function reset() {
            card.className = "card";
            turnedCard.className = "card";
            turnedCard = null;
            resetFlag = false;
        }, 1000);

        // resetStars();
    }

    function gameComplete()
    {
        console.log("game complete");
        clearInterval(timer);

        const completedMoves = document.querySelector('.completedMoves');
        completedMoves.innerHTML = moveCounter;

        const time = document.querySelector('.timer');
        const completedTime = document.querySelector('.completedTime');
        completedTime.innerHTML =  time.innerHTML;


        console.log("complete");
        // const complete = document.querySelector('complete');
        const complete = document.getElementById('complete');
        console.log(complete);
        complete.className = "congratulations";

        gameComplete = true;
    }
 }