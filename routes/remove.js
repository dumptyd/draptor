//jshint node:true
//jshint esversion:6
const router = require('express').Router(),
  addRoute = function (User) {
    router.post('/', function (req, res) {
      User.findById(req.user._id, function (err, user) {
        var index = -1;
        if (req.body.type === 'movie')
        user.movies.forEach(function (e,i) {
          if (e.imdbID === req.body.imdbID) index = i;
        });
        else if(req.body.type === 'series')
          user.tvshows.forEach(function (e,i) {
          if (e.imdbID === req.body.imdbID) index = i;
        });
        if (req.body.type === 'movie' && index!==-1) {
          user.movies.splice(index,1);
          user.save(function (err, saved) {
            if (err) {
              console.log(err);
              res.sendStatus(500);
            }
            else res.status(200).send({
              'movies': saved.movies,
              'tvshows': saved.tvshows
            });
          });
        }
        else if (req.body.type === 'series' && index!==-1) {
          user.tvshows.splice(index,1);
          user.save(function (err, saved) {
            if (err) {
              console.log(err);
              res.sendStatus(500);
            }
            else res.status(200).send({
              'movies': saved.movies,
              'tvshows': saved.tvshows
            });
          });
        }
        else res.sendStatus(403);
      });
    });
    return router;
  };
module.exports = addRoute;