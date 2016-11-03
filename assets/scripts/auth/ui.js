'use strict';

const store = require('../store.js');
const events = require('./events.js');

const success = function(data)
{
  $('#messages').text('success');
  console.log(data);
};

const signUpSuccess = function(data)
{
  store.token = data.user.token;
  $('#messages').text('New user signed up!');
  console.log(data);
  $('#sign-up-modal').modal('hide');
  $('#sign-in-button').html("<form id='sign-out'><input type='submit' name='submit' value='Sign Out!' class='btn btn-primary btn-lg'></form>");
  $('#sign-up-button').html('<button type="button" class="btn btn-primary btn-lg" data-toggle="modal"data-target="#change-password-modal">Change Password</button>');
  $('#account-menu').text(store.user.email.split('@')[0]+"'s Account");
  $('#new-game-buttons').show();
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

const gameCreatedSuccess = function(data)
{
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
  gameCreatedSuccess,
  turnSuccess,
  getGameSuccess,
  updateGameSuccess,
  getGameIdSuccess,
};
