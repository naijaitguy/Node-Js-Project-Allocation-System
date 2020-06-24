
const express = require('express');
const Route = express.Router();
const ProjectController = require('../Controller/ProjectController');


////////////////////////////////
Route.get('/', ProjectController.View_Project);
Route.get('/Edit_Project/:id', ProjectController.Edit_Project);
Route.post('/Edit_Project', ProjectController.ProcessEdit_Project)
Route.get('/Assign_Project', ProjectController.Assign_Project);
Route.post('/Assign_Project', ProjectController.Process_AssignProjects);
//////////////////////////
Route.get('/Students', ProjectController.View_Student);
Route.get('/Edit_Student/:id', ProjectController.View_Student);
Route.get('/Delete_Student/:id', ProjectController.View_Student);

Route.get('/Add_Project', ProjectController.Add_Project);

Route.post('/Add_Project', ProjectController.Process_AddProjects);

module.exports = Route;