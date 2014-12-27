
'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');

var config = require('./config/environment');

// Setup server
var app = express();

var server = require('http').createServer(app);

require('./config/express')(app);

require('./app/routes')(app);

require('./config/errors')(app)


// Start server
server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
module.exports = app;
