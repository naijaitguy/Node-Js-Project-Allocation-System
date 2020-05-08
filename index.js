const express = require('express');
const App = express();
const DbCon = require('./Dbconfig')
//const route = express()
const partials = require('express-partials');
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');
const joi = require('joi');
const session = require('express-session');
App.use(express.static( path.join(__dirname,'Assets')));
App.set('views',__dirname + '/views');
App.use(session({
secret: 'buegfyubgxfyug',resave: false, saveUninitialized: true 
}));
App.set('view engine','ejs' );
App.set('Port', process.env.PORT|| 4000);
App.use(bodyparser.urlencoded({extended : true}));
App.use(bodyparser.json());
App.use(partials());

const userroute = require('./Controller/UserController');

///////////////////////////
App.get('/', userroute.LoginUser);
App.get('/LogOut', userroute.Logout)
App.get('/Login', userroute.LoginUser);
////////////////////////////////
App.post('/ProcessLogin', userroute.ProcessUserLogin);

//////////////////////////
App.get('/Register', userroute.RegisterUser);

App.post('/ProcessUserRegister', userroute.ProcessUserRegister)
//////////////////////////
App.get('/Students', userroute.View_Student);

App.get('/Edit_Student/:id', userroute.View_Student);

App.get('/Delete_Student/:id', userroute.View_Student);
//////////////////////////
App.get('/Projects', userroute.View_Project);

////////////////////////// Get route
App.get('/Edit_Project/:id', userroute.Edit_Project);


//post route
App.post('/Edit_Project', userroute.ProcessEdit_Project)

//////////////////////////
App.get('/Assign_Project', userroute.Assign_Project);

App.post('/Assign_Project', userroute.Process_AddProjects);
//////////////////////////
App.get('/Profile/:id', userroute.Profile);

App.post('/Profile', userroute.Process_Profile);
//////////////////////////
App.get('/Add_Project', userroute.Add_Project);

App.post('/Add_Project', userroute.Process_AddProjects);

App.get('/Home', userroute.LoggedInUserHomePage);
////////////////////////////////

App.get('/AddUser', userroute.AddUser);
////////////////////////////////

App.post('/AddUser', userroute.Process_AddUser);
////////////////////////////////









App.get('*', userroute.PageNotFound)

//////////////////custome 4040--------------
App.listen(4000, (err) =>
{ if (err) { console.log('server failed ')}
 else{console.log(' SERVER IS OPERATIONAL ....')} });