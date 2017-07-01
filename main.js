var inquirer=require("inquirer");
var fs=require("fs");
var BasicCard=require("./BasicCard.js")
var Cards=require("./cards.js")

var flashcards=[];

function newCard(){
	inquirer.prompt([
		{
			type: "confirm",
			name: "newCard",
			message: "Create a new card?",
			default: "true"
		}
	])
	.then(function(answer){
		if (answer.newCard){
			inquirer.prompt([
				{
					type: "input",
					name: "front",
					message: "What's on the front of the card?"
				},
				{
					type:"input",
					name: "back",
					message: "What's on the back of the card?"
				}
			])
			.then(function(answer){
				var card=new BasicCard(answer.front, answer.back);
				flashcards.push(card);
				console.log(flashcards);
				newCard();
			});
		}
		else {
			runCards();
		}
	});
}

newCard();

var currentCardIdx = 0;
function runCards(){
	if(currentCardIdx > flashcards.length - 1) {
		console.log("You are done!");
		return;
	}
	console.log(flashcards[currentCardIdx].front);
	inquirer.prompt([
		{
			type: "confirm",
			name: "showAnswer",
			message: "Show answer?"
		}
	])
	.then(function(answer){
		if (answer.showAnswer){
			console.log(flashcards[currentCardIdx].back);
			currentCardIdx++;
			runCards();
		}
	});
}