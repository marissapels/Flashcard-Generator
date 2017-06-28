var inquirer=require("inquirer");
var fs=require("fs");
var BasicCard=require("./BasicCard.js")
var Cards=require("./cards.js")

var flashcards=[];

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
			flashcards.push(JSON.stringify(card));
			fs.appendFile("cards.json",flashcards,function(err){
				if (err){
					console.log(err);
				}
			});

			fs.readFile("cards.json","utf8",function(error,data){
				if (error){
					console.log(error);
				}
				console.log(data);
				console.log(data[0]);
			})
		});
	}
});