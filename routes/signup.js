//jshint node:true
//jshint esversion:6
const router = require('express').Router(),
  signupRoute = function (passport) {
    router.post('/', function (req, res) {
      passport.authenticate('local-signup', function (err, user, info) {
        if (err) console.log(err);
        else res.json(info);
      })(req, res);
    });
    return router;
  };
module.exports = signupRoute;