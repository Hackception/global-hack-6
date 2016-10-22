/**
 * Module dependencies
 */

var express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  methodOverride = require('method-override'),
  errorHandler = require('errorhandler'),
  morgan = require('morgan'),
  http = require('http'),
  path = require('path'),
  firebase = require('firebase'),
  router = require('./router');

var app = module.exports = express();

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.options('*', cors());
app.get('*', cors());
app.put('*', cors());
app.post('*', cors());
app.delete('*', cors());
app.patch('*', cors());

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
   serviceAccount: "api/constants/global-hack-6-400ea30c06bf.json",
   databaseURL: "https://global-hack-6.firebaseio.com"
 });
global.db = firebase.database();

/**
 * Routes
 */

app.use('/api', router);

/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
