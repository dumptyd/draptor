//jshint node:true
//jshint esversion:6
const router = require('express').Router(),
  addRoute = function (User) {
    router.post('/', function (req, res) {
      var data = {
        imdbID: req.body.imdbID,
        watched: false
      };
      User.findById(req.user._id, function (err, user) {
        //console.log(req.user.movies);
        //console.log(req.user.movies.indexOf('tt0460649'));
        var unique = true;
        console.log(data);
        user.movies.forEach(function (e) {
          if (e.imdbID === req.body.imdbID) unique = false;
        });
        if (req.body.type === 'movie' && unique) {
          user.movies.push(data);
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
        else if (req.body.type === 'series' && unique) {
          user.tvshows.push(data);
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