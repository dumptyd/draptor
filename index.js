// jshint node:true
//jshint esversion:6
require('dotenv').config({silent:true});
const express = require('express'),
  app = express(),
  port = process.env.PORT || 8080,
  mongoose = require('mongoose'),
  passport = require('passport'),
  session = require('express-session'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  path = require('path'),
  User = require('./models/user');
// configuration ===============================================================
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {
  user: process.env.DB_USER,
  pass: process.env.DB_PASS
});
var db = mongoose.connection;
require('./config/passport')(passport);
app.use(cookieParser());
app.use(bodyParser.json());
app.set('view engine', 'pug');
app.set('views', __dirname + '/public/views');
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(express.static(path.join(__dirname , 'public')));
//-------------------------routes------------------------------//
const signin = require('./routes/signin')(passport),
  signup = require('./routes/signup')(passport),
  add = require('./routes/add')(User),
  getData = require('./routes/getData')(User),
  remove = require('./routes/remove')(User),
  toggleWatched = require('./routes/toggleWatched')(User),
  signout = require('./routes/signout')();
//----------------------------routes----------------------------//
app.get('/', function (req, res) {
  if (req.isAuthenticated()) res.redirect('/profile');
  else res.render('index');
});
app.get('/profile', isLoggedIn, function (req, res) {
  res.render('profile');
});
//---------------//
app.use('/signin', signin);
app.use('/signup', signup);
app.use('/add', isLoggedIn, add);
app.use('/getData', isLoggedIn, getData);
app.use('/remove', isLoggedIn, remove);
app.use('/toggleWatched', isLoggedIn, toggleWatched);
app.use('/signout', isLoggedIn, signout);
app.use(function(req,res){
    res.redirect('/');
});
function isLoggedIn(req, res, next) {
//console.log('in loggedin: ' + req.isAuthenticated());
  //console.log(next);
  if (req.isAuthenticated()){return next();}
  res.redirect('/');
}
//--------------------------------------------------------------//
db.once('open', function (err) {
  app.listen(port);
  console.log('Running on ' + port);
});