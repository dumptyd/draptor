//jshint node:true
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var movieSchema = mongoose.Schema({
  imdbID: String,
  watched: Boolean
});
var tvSchema = mongoose.Schema({
  imdbID: String,
  watched: Boolean
});
var userSchema = mongoose.Schema({
  local: {
    username: String,
    password: String,
  },
  movies: [movieSchema],
  tvshows: [tvSchema]
},{timestamps:true});
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};
module.exports = mongoose.model('User', userSchema);