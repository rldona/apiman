/*jshint node:true*/
'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var compress = require('compression');
var cors = require('cors');
// var errorHandler = require('./routes/utils/errorHandler')();
// var favicon = require('serve-favicon');
var logger = require('morgan');
var port = process.env.PORT || 7203;
// var routes;

var environment = process.env.NODE_ENV;

// app.use(favicon(__dirname + '/favicon.ico')); // TODO: add favicon
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(compress());
app.use(logger('dev'));
app.use(cors());
// app.use(errorHandler.init); // TODO: add errorHandler

// routes = require('./routes/index')(app); // TODO: add routes

console.log('=================================');
console.log('Server start...');
console.log('=================================');
console.log('Port = ' + port);
console.log('Env = ' + environment);
console.log('=================================');

app.get('/ping', function(req, res, next) {
    console.log(req.body);
    res.send('pong');
});

switch (environment) {
    case 'build':
        console.log('Build');
        app.use(express.static('./build/'));
        app.use('/*', express.static('./build/index.html'));
        break;
    default:
        console.log('Development');
        console.log('=================================');
        app.use(express.static('./src/client/'));
        app.use(express.static('./'));
        app.use(express.static('./tmp'));
        app.use('/*', express.static('./src/client/index.html'));
        break;
}

app.listen(port, function() {
    console.log('Express server listening on port ' + port);
    console.log('=================================');
});
