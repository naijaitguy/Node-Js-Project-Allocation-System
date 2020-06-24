

const express = require('express');
const Route = express.Router();

const IdentityController = require('../Controller/IdentityController');
//////////////////////////////
Route.get('/', IdentityController.LoginUser);
Route.get('/LogOut', IdentityController.Logout)
Route.get('/Login', IdentityController.LoginUser);
Route.post('/ProcessLogin', IdentityController.ProcessUserLogin);
Route.get('/Register', IdentityController.RegisterUser);
Route.post('/ProcessUserRegister', IdentityController.ProcessUserRegister)
Route.post('/Profile', IdentityController.Process_Profile);
Route.get('/AddUser', IdentityController.AddUser);
////////////////////////////////
Route.get('/Profile/:id', IdentityController.Profile);
Route.post('/AddUser', IdentityController.Process_AddUser);
////////////////////////////////


module.exports = Route;