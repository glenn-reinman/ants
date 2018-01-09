/*
* Module dependencies.
*/
const express = require('express'); // express framework for node.js
const chalk = require('chalk'); // pretty command line colors
const path = require('path'); // utilities for working with file and directory paths
const bodyParser = require('body-parser'); // parse body of POST requests

/*
 * Controllers (route handlers).
 */
// const indexController = require('./controllers/routes/index');

/*
 * Create Express server.
 */
const app = express();

/*
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

/*
 * Primary app routes.
 */
//app.get('/', indexController.index);

/*
 * Start Express server.
 */
app.listen(app.get('port'), function(){
    console.log('%s Express server listening on port %d.', chalk.green('✓'), app.get('port'));
});