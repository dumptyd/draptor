//jshint node:true
//jshint esversion:6
let router = require('express').Router();
let  loginRoute = function (passport) {
    router.post('/', function (req, res) {
      passport.authenticate('local-login', function (err, user, info) {
        if (err) console.log(err);
        if (!user) return res.json(info);
        req.logIn(user, function (err) {
          if (err) console.log(err);
          return res.json(info);
        });
      })(req, res);
    });
    return router;
  };
module.exports = loginRoute;