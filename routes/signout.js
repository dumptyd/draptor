//jshint node:true
//jshint esversion:6
const router = require('express').Router();
const signoutRoute = function () {
  router.get('/', function (req, res) {
    req.logout();
    //req.session.destroy();
    res.redirect('/');
  });
  return router;
};
module.exports = signoutRoute;