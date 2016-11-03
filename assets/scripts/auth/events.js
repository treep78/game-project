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
  let gameData  = gameLogic.newGame(event.target.textContent);
  event.preventDefault();
  api.createGame(gameData)
    .then(ui.createGameSuccess)
    .catch(ui.failure);
  api.getGameId()
    .then(ui.getGameIdSuccess)
    .catch(ui.failure);
}

const processTurn = function (event) {
  let turnResult = gameLogic.turn(event.target.id.split('space')[1]);
  event.preventDefault();
  /*api.getGame()
    .then(ui.getGameSuccess)
    .catch(ui.failure);*/
  api.updateGame(store.gameInProgress)
    .then(ui.updateGameSuccess)
    .catch(ui.failure);

}



const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp);
  $('#sign-in').on('submit', onSignIn);
  $('#change-password').on('submit', onChangePassword);
  $('#sign-out').on('submit', onSignOut);
  $('.grid-space').on('click', processTurn);
  $('.new-game').on('click', onNewGame);
  $('#new-game-buttons').hide();
};

module.exports = {
  addHandlers,
};
