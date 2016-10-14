//jshint node:true
//jshint esversion:6
const router = require('express').Router(),
  toggleRoute = function (User) {
    router.post('/', function (req, res) {
      User.findById(req.user._id, function (err, user) {
        let index = -1;
        if (req.body.type === 'movie')
        user.movies.forEach(function (e,i) {
          if (e.imdbID === req.body.imdbID) index = i;
        });
        else if(req.body.type === 'series')
          user.tvshows.forEach(function (e,i) {
          if (e.imdbID === req.body.imdbID) index = i;
        });
        if (req.body.type === 'movie' && index!==-1) {
          user.movies[index].watched = !user.movies[index].watched;
          user.save(function (err, saved) {
            if (err) {
              console.log(err);
              res.sendStatus(500);
            }
            else res.sendStatus(200);
          });
        }
        else if (req.body.type === 'series' && index!==-1) {
          user.tvshows[index].watched = !user.tvshows[index].watched;
          user.save(function (err, saved) {
            if (err) {
              console.log(err);
              res.sendStatus(500);
            }
            else res.sendStatus(200);
          });
        }
        else res.sendStatus(403);
      });
    });
    return router;
  };
module.exports = toggleRoute;