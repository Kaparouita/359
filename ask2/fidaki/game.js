var player1 ;
var player2 ;
var cells = setPositions();
var currentPlayer ;
var firstTurn = true;

function initPlayers(){
  player1 = new Player("Player 1",1,"Red");
  player2 = new Player("Player 2",1,"White");

  // set the first player randomly
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

// dice images
var dices = ["imagesDice/one.png", "imagesDice/two.png", "imagesDice/three.png", "imagesDice/four.png", "imagesDice/five.png", "imagesDice/six.png"];
function changeDice(diceNumber) {
	document.getElementById("dice").src = dices[diceNumber-1];
}

// get the current player
function getPlayerTurn(){
  return currentPlayer;
}

// roll the dice
function rollDice() {
	var diceNumber = Math.floor(Math.random() * 6) + 1;
  changeDice(diceNumber);
	return diceNumber;
}

// play the turn when the roll button is clicked
function play(){
  var diceNumber = rollDice();
  together = player1.position === player2.position;
  player  = getPlayerTurn();
  if (player.firstTurn) {
    player.firstTurn = false;
    diceNumber -= 1;
    together = false;
  }

  // keep the old position
  oldPosition = player.position;
  player.changePosition(player.position + diceNumber);

  if (hasWon(player,oldPosition)){
    return;
  }

  // if the new position is a snake or a ladder
  swordPlayer = checkTile(player);

  updateGui(oldPosition);
  updatePlayerTurn(diceNumber,together);
  (swordPlayer) ? sword(swordPlayer) : null;

}

// check if the new position is a snake or a ladder or a snake or ladder
function checkTile(player){
  if (cells[player.position].type === "Snake") {
    document.getElementById("gameMessage").innerHTML = "[Snake] "+player.name+" has entered a snake";
    (player.september) ? september(true) : player.changePosition(cells[player.position].to);
  }
  else if(cells[player.position].type === "Ladders"){
    player.changePosition(cells[player.position].to);
    document.getElementById("gameMessage").innerHTML = "[Ladder] "+player.name+" has entered a ladder";
  }
  else if(cells[player.position].type === "Snake or Ladders"){
    var random = Math.floor(Math.random() * 10) ;
    if(random < 5){
      document.getElementById("gameMessage").innerHTML = "[Ladder or Snake] "+player.name+" failed the exam with a " + random;
      (player.september) ? september(false) : player.changePosition(cells[player.position].to[0]);
    }else{
      document.getElementById("gameMessage").innerHTML = "[Ladder or Snake] "+player.name+" passed the exam with a " + random;
      player.changePosition(cells[player.position].to[1]);
      (hasWon(player,player.position)) ? null : checkTile(player);
    }
  }
  else if(cells[player.position].type === "September"){
    player.september = true;
    document.getElementById("gameMessage").innerHTML = "[September] "+player.name+" has entered September";
  }
  else if(cells[player.position].type === "Swords"){
    document.getElementById("gameMessage").innerHTML = "[Swords] "+player.name+" has entered Swords the opponent will be sent back 10 spaces";
    player.sword = true;
    return player;
  }
  return null;
}

// update the player turn
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

// check if the player has won
function hasWon(player,oldPosition){
  if (player.position < 90) {
    return false;
  }
  else if (player.position === 90) {
    document.getElementById("playerMessage").innerHTML = player.name+" has won";
    alert(player.name+" has won!");
    updateGui(oldPosition);
    endGame();
    return true;
  }
  else {
    var dice = (player.position - oldPosition);
    player.changePosition((90 - dice) + (90 - oldPosition));
    document.getElementById("gameMessage").innerHTML = player.name+" did not roll the exact number to win";
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

// if the player is on a sword, then the opponent is sent back 10 spaces
function sword(inputPlayer){
  player = inputPlayer === player1 ? player2 : player1;

  oldPosition = player.position;
  newPosition = player.position - 10;
  if(newPosition < 1){
    newPosition = 1;
  }
  player.changePosition(newPosition);

  swordPlayer = checkTile(player);

  updateGui(oldPosition);
  (swordPlayer) ? sword(swordPlayer) : null;
}

// end the game
function endGame(){
  document.getElementById("gameMessage").innerHTML = "Game Over";
  document.getElementById("playButton").disabled = true;
}

//  update the gui
function updateGui(oldPosition){
	alone = player1.position !== player2.position;
	getPlayerTurn().changePositionGui(oldPosition,alone);
}

