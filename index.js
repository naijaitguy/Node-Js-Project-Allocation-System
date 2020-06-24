const express = require('express');
const App = express();
const partials = require('express-partials');
const bodyparser = require('body-parser');
const path = require('path');
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

const IdentityRoute = require('./Routes/IdentityRoute');
const ProjectRoute = require('./Routes/ProjectRoute');
const StudentRoute = require('./Routes/StudentRoute');
App.use('/Identity', IdentityRoute);
App.use('/Project', ProjectRoute);
App.use('/User', StudentRoute);
App.use('/',IdentityRoute);

App.get('*', function (req, res){res.redirect('/')} );
App.post('*', function (req, res){res.redirect('/')} );
App.put('*', function (req, res){res.redirect('/')} );
App.delete('*', function (req, res){res.redirect('/')} );

//////////////////custome 4040--------------
App.listen(4000, (err) =>
{ if (err) { console.log('server failed ')}
 else{console.log(' SERVER IS OPERATIONAL ....')} });
