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

exports.ProcessUserLogin = function(req, res){
   
    if(req.method == "POST")
   
    {
   const Email = req.body.Email;
   const Password = req.body.Password
   const mybodydata = { Email, Password};
   const bodyschema = Helper.LoginValidation(mybodydata);

    joi.validate(mybodydata,bodyschema, (err, value) => {

    if (err)  { res.render('Login', {error: err.details.map(i => i.message ).join('/'), success:''});   }

        ////////////////////////if  validation is successfull-------------
        else{
        const sql = "SELECT  ID, Email, Password, Date, FullName, UserName, Last_Login, Role FROM users WHERE Email = ? AND Password =?";
        DbCon.query( sql, [Email, Password], function (err, Result)  {
        if(err){    console.log(err); }

        else{
        if(Result.length > 0 ){ 
        req.session.IsloggedIn = true;
        req.UserId = Result[0].ID;
        req.session.User = Result[0];
        
        res.redirect('/Home');
                }

            else{ 
              const mgs = "Invalid Login Credentials !";
                res.render('Login', {error:mgs , success: '' });
                      }

          }

        });
      

       }
   //////////////////////////////////////////------------------------
});



    } 

};

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

exports.View_Student = (req, res) =>{ if(!req.session.IsloggedIn){  res.render('Login', {error: 'Pls Provide your log in Credentials' , success: '' })}
else{

     const Query = " SELECT * FROM student";

   DbCon.query( Query, (err, Result) => {
  if(err){ // console.log(err);
}

     else{

   // console.log(Result);
    res.render('Student' ,{mgs: req.session.User , Data: Result});

  }  

});

   
}
}

exports.AddUser = (req, res) =>{ if(!req.session.IsloggedIn){  res.render('Login', {error: 'Pls Provide your log in Credentials' , success: '' })}

  const Id = req.params.id;
  const Query = " SELECT * FROM users ";

DbCon.query( Query, [Id], (err, Result) => {
if(err){  console.log(err);}

else{

 // console.log(Result);
 res.render('Add_User' ,{mgs: req.session.User , Data: Result});

 }

});

  
}

exports.Profile = (req, res) =>{   if(!req.session.IsloggedIn){  res.render('Login', {error: 'Pls Provide your log in Credentials' , success: '' })}
else{
 res.render('Profile' ,{mgs: req.session.User });}
}
exports.View_Project = (req, res) =>{ if(!req.session.IsloggedIn){  res.render('Login', {error: 'Pls Provide your log in Credentials' , success: '' })}
else{

 const Query = " SELECT * FROM project";

 DbCon.query( Query, (err, Result) => {
if(err){  console.log(err);}

else{

  //  console.log(Result);
    res.render('View_project' ,{mgs: req.session.User,  Data: Result});

   }



   } );
    



}
}
exports.Add_Project = (req, res) =>{ if(!req.session.IsloggedIn){  res.render('Login', {error: 'Pls Provide your log in Credentials' , success: '' })}
else{
 res.render('Add_projects',{mgs: req.session.User});}
}

exports.Assign_Project = (req, res) =>{ if(!req.session.IsloggedIn){  res.render('Login', {error: 'Pls Provide your log in Credentials' , success: '' })}
else{
 res.render('Assign_Project' ,{mgs: req.session.User});}
}
exports.LoginUser = (req, res) => { if(!req.session.IsloggedIn){  res.render('Login', {error: 'Pls Provide your log in Credentials' , success: '' })}
else{
 res.render('Login', {error: '' , success: '' });};
}
exports.RegisterUser = (req, res) => { 
 res.render('Register')
};

exports.ProcessUserRegister = () => {};
 
exports.Logout = (req, res) => {

req.session.IsloggedIn = false;
req.session.destroy();
res.render( 'Login', {error: '' , success: '' });


}

exports.PageNotFound = (req, res) => {   
    res.render('404');

}

exports.Edit_Project = (req, res) =>{ if(!req.session.IsloggedIn){  res.render('Login', {error: 'Pls Provide your log in Credentials' , success: '' })}
else{
const Id = req.params.id;
    const Query = " SELECT * FROM project WHERE ID = ?";

 DbCon.query( Query, [Id], (err, Result) => {
if(err){  console.log(err);}

else{

   // console.log(Result);
    res.render('Edit_project' ,{mgs: req.session.User,  Data: Result});

   }



   } );
}

}


exports.ProcessEdit_Project = (req, res) =>{ res.send('ok') };


exports.Edit_Student = (req, res) =>{ if(!req.session.IsloggedIn){  res.render('Login', {error: 'Pls Provide your log in Credentials' , success: '' })}
else{
const Id = req.params.id;
    const Query = " SELECT * FROM student WHERE ID = ?";

 DbCon.query( Query, [Id], (err, Result) => {
if(err){  console.log(err);}

else{

   // console.log(Result);
    res.render('Edit_' ,{mgs: req.session.User,  Data: Result});

   }



   } );
}

}


exports.Process_AddProjects = (req, res ) => { res.send('ok');}


exports.Process_AssignProjects = (req, res ) => { res.send('ok');}

exports.Process_AddUser = (req, res ) => { res.send('ok');}

exports.Process_Profile = (req, res ) => { res.send('ok');}

