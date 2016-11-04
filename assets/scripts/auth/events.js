'use strict';

const getFormFields = require(`../../../lib/get-form-fields`);

const api = require('./api');
const ui = require('./ui');
const gameLogic = require('../logic/gameLogic.js');
const store = require('../store.js');


const onSignUp = function (event) {
  let data = getFormFields(this);
  event.preventDefault();
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.failure);
};

const onSignIn = function (event) {
  let data = getFormFields(this);
  event.preventDefault();
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.failure);
};

const onChangePassword = function (event) {
  let data = getFormFields(this);
  event.preventDefault();
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.failure);
};

const onSignOut = function (event) {
  event.preventDefault();
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.failure);
};

const onNewGame = function(event) {
  gameLogic.newGame(event.target.textContent);
  event.preventDefault();
  api.createGame(store.gameInProgress)
    .then(ui.createGameSuccess)
    .catch(ui.failure);

  api.getGameId()
    .then(ui.getGameIdSuccess)
    .catch(ui.failure);
}

const processTurn = function (event) {
  if(store.gameInProgress != undefined) {
    let clickedSpace = event.target.id.split('space')[1]
    gameLogic.turn(clickedSpace);
    event.preventDefault();
    let gamePatch = {
      game: {
        cell: {
          index: clickedSpace,
          value: store.gameInProgress.game.cells[clickedSpace]
        },
        over: store.gameInProgress.game.over
      }
    }
    api.updateGame(gamePatch)
      .then(ui.updateGameSuccess)
      .catch(ui.failure);
    if(store.gameInProgress.game.over) {
      $('.forfeit').hide();
      $('#new-game-buttons').show();
      store.gameInProgress = undefined;
    }
  }
}

const onForfeit = function(event)
{
  if($('.forfeit').textContent == "Forfeit") {
    let gamePatch = {
      game: {
        over: true
      }
    }
    console.log('working');
    event.preventDefault();
    api.updateGame(gamePatch)
      .then(ui.updateGameSuccess)
      .catch(ui.failure);
    gameLogic.winner = "player "+gameLogic.player+"forfeits";
  }

  $('.forfeit').hide();
  $('#new-game-buttons').show();
  store.gameInProgress = undefined;
}

const onLoadHotseat = function(event) {
  let data = getFormFields(this);
  event.preventDefault();
  api.loadGameSession(data)
    .then(ui.loadGameSuccess)
    .catch(ui.failure);
}



const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp);
  $('#sign-in').on('submit', onSignIn);
  $('#change-password').on('submit', onChangePassword);
  $('#sign-out').on('submit', onSignOut);
  $('.grid-space').on('click', processTurn);
  $('.new-game').on('click', onNewGame);
  $('.forfeit').on('click', onForfeit);
  $('#load-hotseat').on('click', onLoadHotseat);
  $('#new-game-buttons').hide();
  $('.forfeit').hide();
};

module.exports = {
  addHandlers,
};
