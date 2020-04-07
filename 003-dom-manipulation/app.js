/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GL0BAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var playerScores, roundScore, activePlayer, isGamePlaying;

//init the game
init();

//Add event listener for roll dice button with anonymous function
document.querySelector('.btn-roll')
    .addEventListener("click", function () {
        if (!isGamePlaying) {
            return;
        }
        var dice = Math.floor(Math.random() * 6) + 1;

        //Display dice image
        var diceDom = document.querySelector(".dice");

        diceDom.setAttribute("src", "dice-" + dice + ".png")
        diceDom.style.display = "block"

        // //Display dice result for active player
        // document.querySelector("#current-" + activePlayer).textContent = dice;

        //Update round score if dice result is not equal to 1
        if (dice !== 1) {
            roundScore += dice;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        } else {
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

        //Check if player wins
        if (playerScores[activePlayer] >= 20) {
            document.querySelector("#name-" + activePlayer).textContent = "Winner";
            document.querySelector(".dice").style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");

            isGamePlaying = false;
        } else {
            switchPlayers();
        }
    });

document.querySelector('.btn-new')
    .addEventListener("click", init);


function switchPlayers() {
    roundScore = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

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
    isGamePlaying = true;

    //remove dice in the game beginning
    document.querySelector(".dice").style.display = "none";

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