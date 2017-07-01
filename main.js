var inquirer=require("inquirer");
var fs=require("fs");
var BasicCard=require("./BasicCard.js");
var ClozeCard=require("./ClozeCard.js");

//arrays to store questions and answers
var flashcardsBasic=[];
var flashcardsCloze=[];
//variable to monitor index of flashcardsBasic and flashcardsCloze array
var basicCardIdx = 0;
var clozeCardIdx=0;

//function that creates a new card using inquirer. User is asked if they would like to create a new card. If they select Yes, they are asked to choose a type of card (Basic or Cloze).
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
		if(answer.newCard){
			inquirer.prompt([
			{
				type: "list",
				name: "cardType",
				message: "What type of card?",
				choices: ["Basic Card", "Cloze Card"]
			}
			])
			//function is executed if user selects to create a new Basic card
			.then(function(answer){
				if (answer.cardType==="Basic Card"){
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
					//uses BasicCard Constructor to create card.
					.then(function(answer){
						var card=new BasicCard(answer.front, answer.back);
						//pushes new question and answer into flashcardsBasic array
						flashcardsBasic.push(card);
						//writes flashcardsBasic array into separate file
						fs.writeFile("basicLog.json", JSON.stringify(flashcardsBasic, null, 2));
						console.log(flashcardsBasic);
						newCard();
					});
				}
				//function is executed if user selects to create a new Cloze card
				if (answer.cardType==="Cloze Card"){
					inquirer.prompt([
						{
							type: "input",
							name: "cloze",
							message: "What is the cloze portion of the card?"
						},
						{
							type:"input",
							name: "text",
							message: "What is the remaining text of the card?"
						}
					])
					//uses ClozeCard Constructor to create card.
					.then(function(answer){
						var card=new ClozeCard(answer.cloze, answer.text);
						//pushes new question and answer into flashcardsCloze array
						flashcardsCloze.push(card);
						//writes flashcardsCloze array into separate file
						fs.writeFile("clozeLog.json", JSON.stringify(flashcardsCloze, null, 2));
						console.log(flashcardsCloze);
						newCard();
					});
				}
			})
		}

		else {
			runBasicCards();
		}
	});
}

newCard();
//function will run execute until all questions flashcardsBasic array have been asked. Then the runClozeCards function will be executed
function runBasicCards(){
	//reads stored questions and answers from separate file
	fs.readFile("basicLog.json","utf8",function(error,data){
		if (error){
			return console.log(error);
		}
		if (basicCardIdx > JSON.parse(data).length - 1) {
			runClozeCards();
			return;
		}
		else{
			console.log("\nQuestion: "+ parseInt(basicCardIdx+1)+".  "+JSON.parse(data)[basicCardIdx].front);
		
	
			//Asks the user if they want to see the answer to the question
			inquirer.prompt([
				{
					type: "confirm",
					name: "showAnswer",
					message: "Show answer?"
				}
			])
			//shows answer to user if they say yes by reading from the json file
			.then(function(answer){
				if (answer.showAnswer){
					fs.readFile("basicLog.json","utf8",function(error,data){
						if (error){
							return console.log(error);
						}
						console.log("\nAnswer: "+ parseInt(basicCardIdx+1)+".  "+JSON.parse(data)[basicCardIdx].back);
						basicCardIdx++;
						runBasicCards();
					})
				}
			});
		}
	});
}
//function will run execute until all questions flashcardsCloze array have been asked. Then the runClozeCards function will be executed
function runClozeCards(){

	//reads stored questions and answers from separate file
	fs.readFile("clozeLog.json","utf8",function(error,data){
		if (error){
			return console.log(error);
		}
		if (clozeCardIdx > JSON.parse(data).length - 1) {
			complete();
		}

		else {
			console.log("\nQuestion: "+ parseInt(clozeCardIdx+1)+".  ..."+JSON.parse(data)[clozeCardIdx].partial);
		
	
			//Asks the user if they want to see the answer to the question
			inquirer.prompt([
				{
					type: "confirm",
					name: "showClozeAnswer",
					message: "Show full answer?"
				}
			])
			//shows answer to user if they say yes by reading from the json file
			.then(function(answer){
				if (answer.showClozeAnswer){
					fs.readFile("clozeLog.json","utf8",function(error,data){
						if (error){
							return console.log(error);
						}
						console.log("\nAnswer: "+ parseInt(clozeCardIdx+1)+".  "+JSON.parse(data)[clozeCardIdx].fullText);
						clozeCardIdx++;
						runClozeCards();
					});
				}
			});
		}
	});
}

function complete() {
	console.log("You are done!");
	return;
}
return;