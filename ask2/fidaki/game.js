var player1 ;
var player2 ;
var cells = setPositions();
var currentPlayer ;
var firstTurn = true;

function initPlayers(){
  player1 = new Player("Player 1",0,"Red");
  player2 = new Player("Player 2",0,"White");
  random = Math.floor(Math.random() * 2) ;
  random === 0 ? currentPlayer = player1 : currentPlayer = player2;
  currentPlayer.updatePlayerInfo();
}

function setPositions() {
  var positions = [];
  var snakePositions = [13, 38, 46, 73, 82, 89];
  var snakeNewPositions = [12, 18, 36, 43, 62, 79];

  var ladderPositions = [6, 31, 47, 56, 78];
  var ladderNewPositions = [27, 71, 58, 67, 88];

  var snakes_or_ladders_Positions = [25, 29, 65, 70];
  var snakes_or_ladders_NewPositions = [
    [4,45],
    [9,49],
    [54,84],
    [40,90],
  ];

  for (var i = 0; i <= 90; i++) {
    positions[i] = new Object();
    positions[i].from = i;

    if (snakePositions.indexOf(i) != -1) {
      positions[i].to = snakeNewPositions[snakePositions.indexOf(i)];
      positions[i].type = "Snake";
    } else if (ladderPositions.indexOf(i) != -1) {
      positions[i].to = ladderNewPositions[ladderPositions.indexOf(i)];
      positions[i].type = "Ladders";
    } else if (snakes_or_ladders_Positions.indexOf(i) != -1) {
      positions[i].to = snakes_or_ladders_NewPositions[snakes_or_ladders_Positions.indexOf(i)];
      positions[i].type = "Snake or Ladders";
    } else if (i === 11 || i === 55 || i === 88) {
      positions[i].to = i;
      positions[i].type = "September";
    } else if (i === 22 || i === 44 || i === 77) {
      positions[i].to = i;
      positions[i].type = "Swords";
    } else {
      positions[i].to = i;
      positions[i].type = "Normal";
    }
  }
  return positions;
}

var dices = ["imagesDice/one.png", "imagesDice/two.png", "imagesDice/three.png", "imagesDice/four.png", "imagesDice/five.png", "imagesDice/six.png"];
function changeDice(diceNumber) {
	document.getElementById("dice").src = dices[diceNumber-1];
}

function getPlayerTurn(){
  return currentPlayer;
}

function rollDice() {
	var diceNumber = 3//Math.floor(Math.random() * 6) + 1;
  changeDice(diceNumber);
	return diceNumber;
}

function play(){
  var diceNumber = rollDice();
  together = player1.position === player2.position;

  // keep the old position
  oldPosition = getPlayerTurn().position;
  getPlayerTurn().changePosition(getPlayerTurn().position + diceNumber);

  if (hasWon(oldPosition)){
    endGame();
    return;
  }
  
  // if the new position is a snake or a ladder
  if (cells[getPlayerTurn().position].type === "Snake") {
    (getPlayerTurn().september) ? september(true) : getPlayerTurn().changePosition(cells[getPlayerTurn().position].to);
  }
  else if(cells[getPlayerTurn().position].type === "Ladders"){
    getPlayerTurn().changePosition(cells[getPlayerTurn().position].to);
  }
  else if(cells[getPlayerTurn().position].type === "Snake or Ladders"){
    var random = Math.floor(Math.random() * 10) ;
    if(random < 5){
      document.getElementById("gameMessage").innerHTML = "[Ladder or Snake] "+getPlayerTurn().name+" failed the exam with a " + random;
      (getPlayerTurn().september) ? september(false) : getPlayerTurn().changePosition(cells[getPlayerTurn().position].to[0]);
    }else{
      document.getElementById("gameMessage").innerHTML = "[Ladder or Snake] "+getPlayerTurn().name+" passed the exam with a " + random;
      getPlayerTurn().changePosition(cells[getPlayerTurn().position].to[1]);
    }
  }
  else if(cells[getPlayerTurn().position].type === "September"){
    getPlayerTurn().september = true;
    document.getElementById("gameMessage").innerHTML = "[September] "+getPlayerTurn().name+" has entered September";
  }
	  
  updateGui(oldPosition);
  updatePlayerTurn(diceNumber,together);
}

function updatePlayerTurn(diceNumber,together){
  currentPlayer = getPlayerTurn() === player1 ? player2 : player1;
  getPlayerTurn().updatePlayerInfo();
  if (together ) {
		getPlayerTurn().changePositionGui(getPlayerTurn().position,true);
	}
  if(diceNumber === 6){
    currentPlayer = getPlayerTurn() === player1 ? player2 : player1;
    getPlayerTurn().updatePlayerInfo();
    document.getElementById("playerMessage").innerHTML = getPlayerTurn().name+" rolled a "+diceNumber+" and gets another turn";
  }
}

function hasWon(oldPosition){
  if (getPlayerTurn().position < 90) {
    return false;
  }
  else if (getPlayerTurn().position === 90) {
    document.getElementById("playerMessage").innerHTML = getPlayerTurn().name+" has won";
    alert(getPlayerTurn().name+" has won!");
    return true;
  }
  else {
    var dice = (getPlayerTurn().position - oldPosition);
    getPlayerTurn().changePosition((90 - dice) + (90 - oldPosition));
    document.getElementById("gameMessage").innerHTML = getPlayerTurn().name+" did not roll the exact number to win";
    return false;
  }
}

// if snake is true, then the player is on a snake else the player is on a snake or ladder
function september(snake){
  random = Math.floor(Math.random() * 10) ;
  if(random < 5){
    document.getElementById("gameMessage").innerHTML = "[September] "+getPlayerTurn().name+" failed the exam with a " + random;
    (snake) ? getPlayerTurn().changePosition(cells[getPlayerTurn().position].to) :
              getPlayerTurn().changePosition(cells[getPlayerTurn().position].to[0])
  }
  else{
    document.getElementById("gameMessage").innerHTML = "[September] "+getPlayerTurn().name+" passed the exam with a " + random;
  }
}

function endGame(){
  document.getElementById("gameMessage").innerHTML = "Game Over";
  document.getElementById("playButton").disabled = true;
}

function updateGui(oldPosition){
	alone = player1.position !== player2.position;
	getPlayerTurn().changePositionGui(oldPosition,alone);
}

