//jshint node:true
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
module.exports = function (passport) {
  
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
  
  passport.use('local-signup', new LocalStrategy({
    passReqToCallback: true
  }, function (req, username, password, done) {
    if(username===''||password==='')
      return done(null, false, {'signupMessage':'Username and password can\'t be empty.','type':'error'});
    User.findOne({
      'local.username': username
    }, function (err, user) {
      if (err) return done(err);
      if (user) {
        return done(null, false, {'signupMessage':'That username is already taken.','type':'error'});
        
      }
      else {
        var newUser = new User();
        newUser.local.username = username;
        newUser.local.password = newUser.generateHash(password);
        newUser.save(function (err) {
          if (err) throw err;
          return done(null, newUser, {'signupMessage':'Signed up successfully. You can now login.','type':'success'});
        });
      }
    });
  }));
  
  passport.use('local-login', new LocalStrategy({
        passReqToCallback : true
    },
    function(req, username, password, done) {
        User.findOne({ 'local.username' :  username }, function(err, user) {
            if (err)
                return done(err);
            if (!user)
                return done(null, false, {'loginMessage':'No user found.',type:'error'});
            if (!user.validPassword(password))
                return done(null, false, {'loginMessage':'Oops! Wrong password.',type:'error'});

            return done(null, user,{'location':'/profile',type:'success'});
        });

    }));

};