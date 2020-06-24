

const express = require('express');
const Route = express.Router();
const StudentController = require('../Controller/StudentController');


Route.get('/Home', StudentController.LoggedInUserHomePage);
//////////////////////////



//////////////////////////


module.exports = Route;