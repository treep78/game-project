'use strict';

const store = require('../store.js');
const events = require('./events.js');
const gameLogic = require('../logic/gameLogic.js');

const success = function(data)
{
  $('#messages').text('success');
  console.log(data);
};

const signUpSuccess = function(data)
{
  store.token = data.user.token;
  $('#sign-up-modal').modal('hide');
  signInSuccess(data);
};

const signInSuccess = function(data)
{
  store.user = data.user;
  $('#messages').text('User signed in!');
  $('#sign-in-modal').modal('hide');
  $('#sign-in-button').html("<form id='sign-out'><input type='submit' name='submit' value='Sign Out!' class='btn btn-primary btn-lg'></form>");
  $('#sign-up-button').html('<button type="button" class="btn btn-primary btn-lg" data-toggle="modal"data-target="#change-password-modal">Change Password</button>');
  $('#account-menu').text(store.user.email.split('@')[0]+"'s Account");
  $('#new-game-buttons').show();
};

const changePasswordSuccess = function(data)
{
  console.log(data);
  $('#messages').text('Password Changed!');
  $('#change-password-modal').modal('hide');
};

const signOutSuccess = function()
{
  store.user = null;
  $('#messages').text('User signed out!');
  $('#sign-in-button').html('<button type="button" class="btn btn-primary btn-lg" data-toggle="modal"data-target="#sign-in-modal">Sign In</button>');
  $('#sign-up-button').html('<button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#sign-up-modal">Sign Up</button>');
  $('#account-menu').text('Sign up/in');
  $('#new-game-buttons').hide();
  gameLogic.winner = "Nobody";
}

const turnSuccess = function()
{

}

const getGameSuccess = function(data)
{
    //console.table(data.games);
}

const updateGameSuccess = function(data)
{
  console.table(data);
}

const createGameSuccess = function(data)
{
  $('#new-game-buttons').hide();
  $('.forfeit').show();
  $('#winner-text').text("");
}

const getGameIdSuccess = function (data) {
  //console.table(data.games);
  console.table(data.games);
  let gameId;
  for(let i in data.games)
  {
    if(store.user.id === data.games[i].player_x.id)
    {
      store.sessionID = data.games[i].id;
      console.log(store.sessionID);
    }
  }
  $('#session-id-display').text("Session ID: "+store.sessionID);
}

const loadGameSuccess = function (data) {
  if(!data.game.over)
  {
    store.sessionID = data.game.id;
    store.gameInProgress = data;
    $('#session-id-display').text("Session ID: "+store.sessionID);
    store.gameInProgress.game.cells = data.game.cells;
    console.log(store.gameInProgress)
    gameLogic.winner = null;
    let xVO = 0;
    for(let i in store.gameInProgress.game.cells)
    {
      if(store.gameInProgress.game.cells[i] !== "")
      {
        $('#space'+i).attr('src', "./assets/images/"+store.gameInProgress.game.cells[i]+".png");
        store.gameInProgress.game.cells[i] === "x" ? xVO += 1 : xVO -= 1;
      }
    }
    xVO >= 0 ? gameLogic.player = "x" : gameLogic.player = "o";
    console.log(store.gameInProgress.game.cells);
    createGameSuccess();
  }
}

const failure = (error) => {
  console.error(error);
  $('#messages').text('failure');
};

module.exports = {
  failure,
  success,
  signUpSuccess,
  signInSuccess,
  changePasswordSuccess,
  signOutSuccess,
  createGameSuccess,
  turnSuccess,
  getGameSuccess,
  updateGameSuccess,
  getGameIdSuccess,
  loadGameSuccess,
};
