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
				// fs.appendFile("cards.js",flashcards,function(err){
				// 	if (err){
				// 		console.log(err);
				// 	}
				// });
				console.log(flashcards);
				// fs.readFile("cards.js","utf8",function(error,data){
				// 	if (error){
				// 		console.log(error);
				// 	}
				// 	console.log(data);
				// 	console.log(data[0]);
				// })
				newCard();
			});
		}
		else {
			runCards();
		}
	});
}

newCard();

function runCards(){
	for (var i=0; i<flashcards.length;i++){
		console.log(flashcards[0].front);
		inquirer.prompt([
			{
				type: "confirm",
				name: "showback",
				message: "Show answer?"
			}
		])
		.then(function(answer){
			if (answer.showback){
				console.log(flashcards)
			}
		})
	}
	
	// var parseFlashcards=JSON.parse(flashcards);
	// console.log(parseFlashcards);
	// for (var i=0; i<flashcards.length; i++){
	// 	var parseFlashcard=JSON.parse(flashcards[i])
	// }
}