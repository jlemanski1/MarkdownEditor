/*
    SERVERJS
    Application entry point
*/


var express = require('express');
var sharejs = require('share');
require('redis');

var app = express();

app.set('view engine', 'ejs');

// Set app to use public folder where assets are stored
app.use(express.static(__dirname + '/public'));

// App Routes
app.get('/', function(req, res) {
    res.render('mkdViewer');
});

// ShareJS options
var options = {
    db: {type: 'redis'},
};

// Attach express server to shareJS
sharejs.server.attach(app, options);

// Listen on port 8000 for localhost
var port = 8000;
app.listen(port, () => {
    console.log('Server running');
});