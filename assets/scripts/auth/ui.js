'use strict';

const store = require('../store.js');

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
  $('#sign-in-button').html("<form id='sign-out'><input type='submit' name='submit' value='Sign Out!'></form>");
  $('#sign-up-button').html('<button type="button" class="btn btn-primary btn-lg" data-toggle="modal"data-target="#change-password-modal">Change Password</button>');
};

const signInSuccess = function(data)
{
  store.user = data.user;
  console.log(data);
  $('#messages').text('User signed in!');
  $('#sign-in-modal').modal('hide');
  console.log($('#sign-in-button').text());
  $('#sign-in-button').html("<form id='sign-out'><input type='submit' name='submit' value='Sign Out!'></form>");
  $('#sign-up-button').html('<button type="button" class="btn btn-primary btn-lg" data-toggle="modal"data-target="#change-password-modal">Change Password</button>');
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
};
