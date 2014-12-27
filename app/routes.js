/**
 * Main application routes
 */

'use strict';

var errors = require('./helpers/errors/index');

module.exports = function(app) {

    // Insert routes below
    app.use('/', require('./controllers/index'));

};
