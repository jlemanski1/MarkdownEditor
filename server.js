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
app.get('/(:id)', function(req, res) {
    res.render('mkdViewer');
});

// Setup redis server
var redisClient;
console.log(process.env.REDISTOGO_URL);
if (process.env.REDISTOGO_URL) {
    var rtg = require('url').parse(process.env.REDISTOGO_URL);
    redisClient = require('redis').createClient(rtg.port, rtg.hostname);
    redisClient.auth(rtg.auth.split(':')[1]);
} else {
    redisClient = require('redis').createClient();
}

// ShareJS options
var options = {
    db: {type: 'redis'},
};

// Attach express server to shareJS
sharejs.server.attach(app, options);

// Listen on port
var port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log('Server running');
});