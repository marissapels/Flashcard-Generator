var ClozeCard =function(cloze, text) {
	this.cloze=cloze;
	this.partial=text;
	this.fullText=cloze+" "+text;
}

module.exports=ClozeCard;