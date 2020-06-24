const  Helper = require('../Assets/Helper');
const joi = require('joi');
const DbCon = require('../Dbconfig');
const { render } = require('ejs');



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


exports.ProcessEdit_Project = (req, res) =>{

  const Id = req.body.id;
  const Topic = req.body.topic;
  const Area = req.body.area;
  const supervisor = req.body.supervisor;
  const program = req.body.program;
    const Query = "UPDATE project SET Project_Topic =?, Area_Of_Knowledge = ? , supervisor = ? , Program = ?  WHERE ID = ?";

 DbCon.query( Query, [Topic, Area, supervisor, program, Id], (err, Result) => {
if(err){  console.log(err);}
else{ 
if(Result){

  res.redirect('/Project/Edit_Project/'+ Id)
  
}

}

});

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


exports.Profile = (req, res) =>{   if(!req.session.IsloggedIn){  res.render('Login', {error: 'Pls Provide your log in Credentials' , success: '' })}
else{
 res.render('Profile' ,{mgs: req.session.User });}
}
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

exports.Process_AddUser = (req, res ) => { res.send('ok');}

exports.Process_Profile = (req, res ) => { res.send('ok');}


exports.Process_AddProjects = (req, res ) => {
  
  const Id = req.body.id;
  const Topic = req.body.topic;
  const Area = req.body.area;
  const supervisor = req.body.supervisor;
  const program = req.body.program;
const Ava = "True";
  const Query ="SELECT ID FROM project WHERE  Project_Topic =?  ";

  DbCon.query(Query,[Topic], (err, Result)=>{

    if(Result.length >0){
   //console.log(Result.length );
      res.render('Add_projects', {mgs: req.session.User,suc:"", err:"Project Topic Already Exist"});

    }else{

     const  Query = " INSERT INTO project(Project_Topic, Program, Date_Added, Added_By, supervisor, Area_Of_Knowledge, Availability) VALUES(?,?,?,?,?,?,?)";

     DbCon.query(Query,[Topic,program,Date.now(),req.session.User.UserName,supervisor,Area, Ava],(err, Result)=>{

      if(Result){

        res.render('Add_projects', {mgs: req.session.User,err:"",suc:"Project Addedd Successfully"});

      }else{
        res.render('Add_projects', {mgs: req.session.User,err:"Could Not Add Project",suc:""});
        }


     })

    }

  });


}


exports.Process_AssignProjects = (req, res ) => { res.send(req.body);}



exports.Add_Project = (req, res) =>{ if(!req.session.IsloggedIn){  res.render('Login', {error: 'Pls Provide your log in Credentials' , success: '' })}
else{
 res.render('Add_projects',{mgs: req.session.User, err:"", suc:""});}
}

exports.Assign_Project = (req, res) =>{ if(!req.session.IsloggedIn){  res.render('Login', {error: 'Pls Provide your log in Credentials' , success: '' })}
else{
 res.render('Assign_Project' ,{mgs: req.session.User});}
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
