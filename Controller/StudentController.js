const express = require('express');
const App = express();
const DbCon = require('../Dbconfig')
//const route = express()
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');
const joi = require('joi');
const session = require('express-session');
const Helper = require('../Assets/Helper');


exports.LoggedInUserHomePage = (req, res) =>{
if(!req.session.IsloggedIn){  res.render('Login', {error: 'Pls Provide your log in Credentials' , success: '' })}
else{

const query = "SELECT  s.Name, s.Matric_Number, s.Program, p.Project_Topic, p.supervisor, p.Date_Added FROM student s  INNER JOIN  project p ON  s.Project_Id = p.ID";
DbCon.query(query, [], (err, Result) => {

       if(err){ console.log(err)}
       else{

        res.render('Home',{mgs: req.session.User, Data: Result});
      //  console.log(Result)
       }
    
} );



}

};
