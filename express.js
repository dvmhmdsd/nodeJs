var express = require('express');
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();

app.set('view engine', 'ejs');

app.use('/assets', express.static('assets'));


app.get('/profile/:name', function(req, res) {
    var data = {
        age: 23,
        job: 'prog',
        hobbies: ['reading', 'programming', 'eating']
    }
    res.render('profile', {person: req.params.name, data: data});
});

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/contact', function(req, res) {
    res.render('contact', {qs: req.query});
});

app.post('/contact', urlencodedParser, function(req, res) {
    res.render('contact-success', {data: req.body});
});

/* app.get('/', function(req, res) {
    res.send('home page');
});

app.get('/story', function(req, res) {
    res.send('story page');
});

// routing with parameters
app.get('/profile/:id', function(req, res) {
    res.send('the id is: ' + req.params.id);
}); 

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
}) */

app.listen(3000);