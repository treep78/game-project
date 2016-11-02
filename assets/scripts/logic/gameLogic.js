'use strict'

//const events = require('../auth/events.js');
const store = require('../store.js');

let gameGrid = [];
for(let i = 0; i<9; i++) {gameGrid.push(i+9)};
let player = "x";
let winner = null;
let turns = 1;
let gameData = {};

const newGame = function(gameType) {
  for(let i = 0; i < 9; i++) {
    $('#space'+i).attr('src', "./assets/images/blankSpace.png");
  }
  gameGrid = [];
  for(let i = 0; i<9; i++) {gameGrid.push(i+9)};
  player = "x";
  winner = null;
  turns = 1;
  gameData = {
    cells: gameGrid,
    over: false,
    player_x: {
      id: store.user.id,
      email: store.user.email
    },
    player_o: {}
  };
  if(gameType === "Hot-Seat") {gameData.player_o.email = "guest";}
  return gameData;
}

const checkWin = function() {
  for (let i = 1; i < 5; i++) {
    if(i !== 2)
    {
      if(gameGrid[0] === gameGrid[0+i] && gameGrid[0] === gameGrid[0+(2*i)]) {
        winner = gameGrid[0]
        console.log(winner);
        return winner;
      }
      else if (gameGrid[8] === gameGrid[8-i] && gameGrid[8] === gameGrid[8-(2*i)]) {
        winner = gameGrid[8]
        console.log(winner);
        return winner;
      }
    }
    if (gameGrid[4] === gameGrid[4+i] && gameGrid[4] === gameGrid[4-i]) {
      winner = gameGrid[4]
      console.log(winner);
      return winner;
    }
    else if(turns === 9) {
      console.log("stale mate"+turns);
      winner = "draw";
      return winner;
    }
  }
}

const turn = function(space) {
  if(player === "x" && gameGrid[(space/1)] !== "o" && winner === null) {
    gameGrid[(space/1)] = "x";
    $('#space'+space).attr('src', "./assets/images/x.png");
    player = "o";
    checkWin();
    turns += 1;
  }
  else if (gameGrid[(space/1)] !== "x" && winner === null){
    gameGrid[(space/1)] = "o";
    $('#space'+space).attr('src', "./assets/images/o.png");
    player = "x";
    checkWin();
    turns +=1;
  }
  return [gameGrid, !!winner];
}

module.exports = {
  turn,
  newGame,
}
