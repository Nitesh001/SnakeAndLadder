(function(){

	var TOTAL_PLAYERS = 1,
		PLAYER_TURN = 0,
		COLORS = ["red","blue","green","yellow"],
		PLAYERS = [],
		snakePos = {
					"37":17,
					"31":14,
					"99":7,
					"78":39,
					"92":35,
					"73":53,
					"3":51,
					"6":27,
					"20":70,
					"36":55,
					"63":95,
					"68":98
					},
		playerSticks = {
			"red":"<span class='red snake-disk'></span>",
			"blue":"<span class='blue snake-disk'></span>",
			"green":"<span class='green snake-disk'></span>",
			"yellow":"<span class='yellow snake-disk'></span>"
		};

	function createBoard(){

		for(var i=0;i<100;i+=10){
			for(var j=0;j<10;j++){
				var k = 0,
					tempClass="",
					tempTitle="";
				if((i/10)%2===0){
					k = 100-(i+j);
					if(snakePos[k]){
						if(parseInt(k) > snakePos[k]){
							tempClass = "snake-back";
							tempTitle = "down to "+snakePos[k];	
						}else{
							tempClass = "ladder-back";
							tempTitle = "high to "+snakePos[k];
						}	
					}
					box = $("<div></div>").addClass("snake-box thumbnail").addClass(tempClass).attr("data-index",k).attr("title",tempTitle).html(k);
				}
				else{
					k = 91-i+j;
					if(snakePos[k]){
						if(parseInt(k) > snakePos[k]){
							tempClass = "snake-back";
							tempTitle = "down to "+snakePos[k];	
						}else{
							tempClass = "ladder-back";
							tempTitle = "high to "+snakePos[k];
						}	
					}
					box = $("<div></div>").addClass("snake-box thumbnail").addClass(tempClass).attr("data-index",k).attr("title",tempTitle).html(k);	
				}
				
				$("#mainBoard").append(box);				
			}
		}
		for(var key in playerSticks){
			var count = count||0;
			$("[data-index=1]","#mainBoard").append(playerSticks[key]);	
			$("."+key,"#mainBoard").attr("title",PLAYERS[count].getPlayerName());
			if(++count === PLAYERS.length){
				break;
			}
		}
		$(".dice-btn","#diceZone").html(PLAYERS[0].getPlayerName()+"'s turn!")
	}

	function bindDiceEvent(){
		$(".dice-btn","#diceZone").off("click").on("click",function(){
			var num = generteRandomNumber();
			$(".dice-score","#parentZone").html(PLAYERS[PLAYER_TURN].getPlayerName() + " got " + num);
			movePlayer(num);
		})
		$(".restart-game","#diceZone").off("click").on("click",function(){
			location.reload();
		});
	}

	function generteRandomNumber(){
			return Math.floor(Math.random() * 6) + 1
	}

	function movePlayer(num){
		var score = PLAYERS[PLAYER_TURN].getPlayerScore();
		score = score+num,
		col = PLAYERS[PLAYER_TURN].getPlayerColor(),
		currentElement = $("."+col,"#mainBoard"),
		currentPosition=getPosition(currentElement[0]),
		newPosition={},
		tempPosition = false;
		
		/*moving high or moving down*/
		if(snakePos[score]){
			tempPosition = {};
			newPosition = getPosition($("[data-index="+score+"]","#mainBoard")[0]);
			tempPosition.x = newPosition.x - currentPosition.x + $("."+col,"#mainBoard")[0].offsetLeft;
			tempPosition.y = newPosition.y - currentPosition.y + $("."+col,"#mainBoard")[0].offsetTop;
			animateElement($("."+col,"#mainBoard"),tempPosition);			
			score = snakePos[score];
			currentPosition = getPosition(currentElement[0]);
			tempPosition=true;
		}else{
			tempPosition=false;
		}

		if(score>100){
			if(PLAYER_TURN+1===PLAYERS.length){
				PLAYER_TURN=0;
			}else{
				PLAYER_TURN++;
			}
			$(".dice-btn","#diceZone").html(PLAYERS[PLAYER_TURN].getPlayerName()+"'s turn!");			
			return;
		}

		PLAYERS[PLAYER_TURN].setPlayerScore(score);
		newPosition = getPosition($("[data-index="+score+"]","#mainBoard")[0]);
		newPosition.x = newPosition.x - currentPosition.x + $("."+col,"#mainBoard")[0].offsetLeft;
		newPosition.y = newPosition.y - currentPosition.y + $("."+col,"#mainBoard")[0].offsetTop;

		if(tempPosition){
		window.setTimeout(function(){
			animateElement($("."+col,"#mainBoard"),newPosition);
		},2200);						
		}else{
			animateElement($("."+col,"#mainBoard"),newPosition);
		}
		
		//$("."+col,"#mainBoard").appendTo($("[data-index="+score+"]","#mainBoard"));
	
		if(score===100){
			alert("Player "+ PLAYERS[PLAYER_TURN].getPlayerName() + " wins");
			$(".dice-btn","#diceZone").html(PLAYERS[PLAYER_TURN].getPlayerName()+" wins").addClass("disabled");
			$(".dice-score","#parentZone").addClass("hide");
			$(".restart-game","#diceZone").removeClass("hide");
		}else{
			if(PLAYER_TURN+1===PLAYERS.length){
				PLAYER_TURN=0;
			}else{
				PLAYER_TURN++;
			}
			$(".dice-btn","#diceZone").html(PLAYERS[PLAYER_TURN].getPlayerName()+"'s turn!");
		}

	}

	function createPlayers(){
		var TOTAL_PLAYERS=0,
			name="",
			obj={},
			mssg = "Enter Total Players (<=4)";
		do{
			TOTAL_PLAYERS = prompt(mssg);
			if(isNaN(TOTAL_PLAYERS/1)){
				mssg += "(only numbers)";
				TOTAL_PLAYERS=null;
			}
		}while(TOTAL_PLAYERS==null || TOTAL_PLAYERS=="")
		
		for(var i=1;i<=TOTAL_PLAYERS;i++){
			do{
				name = prompt("Enter Player "+ i + " name");	
			}while(name==null || name=="")
			
			obj = new Player(name,COLORS[i-1]);
			PLAYERS.push(obj);
		}
	}

	createPlayers();
	createBoard();
	bindDiceEvent();
})();

