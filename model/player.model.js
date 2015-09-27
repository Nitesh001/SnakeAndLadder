function Player(pname,color){
	var playerName = pname,
	playerScore = 1,
	playerColor = color;

	this.getPlayerName=function(){
		return playerName;
	}

	this.getPlayerScore = function(){
		return playerScore;
	}

	this.getPlayerColor = function(){
		return playerColor;
	}

	this.setPlayerScore = function(pscore){
		playerScore = pscore;
	}
}