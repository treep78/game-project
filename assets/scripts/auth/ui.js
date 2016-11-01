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
};

const signInSuccess = function(data)
{
  store.user = data.user;
  console.log(data);
  $('#messages').text('User signed in!');
};

const changePasswordSuccess = function(data)
{
  console.log(data);
  $('#messages').text('Password Changed!');
};

const signOutSuccess = function()
{
  store.user = null;
  $('#messages').text('User signed out!');
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
