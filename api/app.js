
/**
 * Module dependencies
 */

var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  errorHandler = require('errorhandler'),
  morgan = require('morgan'),
  api = require('./index'),
  http = require('http'),
  path = require('path'),
  firebase = require('firebase'),
  callResponse = require('./call-response'),
  callPath = require('./call-path');

var app = module.exports = express();

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(bodyParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());

var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
  app.use(errorHandler());
}

// production only
if (env === 'production') {
  // TODO
}

/**
 * Firebase set up
 */
 firebase.initializeApp({
   serviceAccount: "global-hack-6-d470454bd9b9.json",
   databaseURL: "https://global-hack-6.firebaseio.com"
 });
var db = firebase.database();

/**
 * Routes
 */

// JSON API
app.get('*', api.name);
app.post('/name', api.post_name);
app.post('something', function(req, res) {

  var args = {}
  callResponse.handleCall(db, args, nextStep);
})

function nextStep(index) {
  // TODO

  console.log(index);
}

/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});