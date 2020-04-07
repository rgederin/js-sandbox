/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GL0BAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:
1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn.
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var playerScores, roundScore, activePlayer, isGamePlaying, previousDice, endGameScore;
var endGameScoreDom = document.querySelector("#end-game-score");



//init the game
init();

//Add event listener for roll dice button with anonymous function
document.querySelector('.btn-roll')
    .addEventListener("click", function () {
        if (!isGamePlaying) {
            return;
        }
        var diceFirst = Math.floor(Math.random() * 6) + 1;
        var diceSecond = Math.floor(Math.random() * 6) + 1;

        var diceSum = diceFirst + diceSecond;

        //Display dice image
        var diceFirstDom = document.querySelector(".left-dice");
        var diceSecondDom = document.querySelector(".right-dice");

        diceFirstDom.setAttribute("src", "dice-" + diceFirst + ".png");
        diceSecondDom.setAttribute("src", "dice-" + diceSecond + ".png");

        diceFirstDom.style.display = "block";
        diceSecondDom.style.display = "block";

        if (diceSum === previousDice ) {
            alert("Two times same dice sum");
            playerScores [activePlayer] = 0;
            switchPlayers();
            return;
        }

        //Update round score if dice result is not equal to 1
        if (diceFirst !== 1 && diceSecond !== 1) {
            roundScore += diceSum;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
            previousDice = diceSum;
        } else {
            alert("You roll 1. Round score is 0 now!");
            switchPlayers();
        }
    });

document.querySelector('.btn-hold')
    .addEventListener("click", function () {
        if (!isGamePlaying) {
            return
        }

        //Add current player score to global score
        playerScores[activePlayer] += roundScore;

        //Update UI
        document.querySelector("#score-" + activePlayer).textContent = playerScores[activePlayer];

        console.log(playerScores[activePlayer]);
        console.log(endGameScore);
        //Check if player wins
        if (playerScores[activePlayer] >= endGameScore) {
            document.querySelector("#name-" + activePlayer).textContent = "Winner";
            document.querySelector(".left-dice").style.display = "none";
            document.querySelector(".right-dice").style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");

            isGamePlaying = false;
            endGameScoreDom.readOnly = false;
        } else {
            switchPlayers();
        }
    });

document.querySelector('.btn-new')
    .addEventListener("click", function () {
        init();
        endGameScore = endGameScoreDom.value;

        endGameScoreDom.readOnly = true;
        isGamePlaying = true;
        console.log("end game score = " + endGameScore);
    });

function switchPlayers() {
    roundScore = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    previousDice = 0;

    document.querySelector(".left-dice").style.display = "none";
    document.querySelector(".right-dice").style.display = "none";

    document.querySelector("#current-0").textContent = roundScore;
    document.querySelector("#current-1").textContent = roundScore;

    //Toggle - if class already there - remove it if nope - add
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
}

function init() {
    playerScores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    previousDice = 0;

    document.querySelector(".left-dice").style.display = "none";
    document.querySelector(".right-dice").style.display = "none";

    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
}