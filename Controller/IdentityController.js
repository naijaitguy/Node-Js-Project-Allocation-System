const  Helper = require('../Assets/Helper');
const joi = require('joi');
const DbCon = require('../Dbconfig');

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

exports.Process_AddUser = (req, res ) => { res.send('ok');}
exports.Process_Profile = (req, res ) => { res.send('ok');}



exports.Profile = (req, res) =>{   if(!req.session.IsloggedIn){  res.render('Login', {error: 'Pls Provide your log in Credentials' , success: '' })}
else{
 res.render('Profile' ,{mgs: req.session.User });}
}

exports.LoginUser = (req, res) => {   res.render('Login', {error: '' , success: '' });
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
        
        res.redirect('/User/Home');
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
