//jshint node:true
//jshint esversion:6
const router = require('express').Router(),
  dataRoute = function (User) {
    router.get('/', function (req, res) {
      User.findById(req.user._id, function (err, user) {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        }
        else if (!user || err) res.sendStatus(403);
        else res.status(200).send({
          movies: user.movies,
          tvshows: user.tvshows
        });
      });
    });
    return router;
  };
module.exports = dataRoute;