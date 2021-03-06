// Requires
var ClozeCard = require("./lib/ClozeCard");
var cardData = require("./basic.json");
var inquirer = require("inquirer");

//initial start of the game
initGame();

function initGame() {
	var currentCard;
	var cardArray = [];
	var initialScore = 0;
	var initialIndex = 0;


for (var i = 0; i < cardData.length; i++) {
	currentCard = new ClozeCard(cardData[i].partial, cardData[i].cloze);
	cardArray.push(currentCard);
}
// beginning
	playGame(initialScore, cardArray, initialIndex);
}

function gameOver(score) {
	console.log("Game Over!");
	console.log("Score:", score);
	inquirer.prompt([{
		type: "input",
		name: "text",
		message: "Try Again?"
	}]).then(function(answer){
		if (answer.text.charAt(0).toLowerase() === "y") {
			initGame(); // Restarts game
		}
		else {
			console.log("Nice Job!");
			console.log("Peace Out Homie!");
		}
	});
}


function playGame(currentScore, cardArray, currentIndex) {
	if (currentIndex < cardArray.length) {
		promptUser(cardArray, currentIndex, currentScore);
	}
	else {
		gameOver(currentScore);
	}
}

function promptUser(cardArray, currentIndex, currentScore) {
	var card = cardArray[currentIndex];

	inquirer.prompt([{
		type: "input",
		name: "text",
		message: card.partial +"\nAnswer:"
	}]).then(function(answer) {
		if (answer.text.trim().toLowerCase() === card.cloze.trim().toLowerCase()) {
			currentScore++;
			console.log("You are correct!");
		}
		else {
			console.log("Wrong, Idiot!");
		}
			console.log(card.displayCard());
			currentIndex++;
			console.log("1234567890");
			playGame(currentScore, cardArray, currentIndex);
	});
}